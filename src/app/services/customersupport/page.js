"use client";
import { useEffect, useMemo, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useAuth } from "@/app/contexts/AuthContext";
import useMessaging from "@/hooks/useMessaging";
import toast from "react-hot-toast";

const ChatSupport = () => {
  const { user } = useAuth();
  const {
    getConversations,
    getMessages,
    sendMessage,
    conversations,
    messages,
    setActiveUserId,
  } = useMessaging();
  const [input, setInput] = useState("");
  const DEFAULT_ADMIN_ID = process.env.NEXT_PUBLIC_DEFAULT_ADMIN_ID || null;
  const [recipientId, setRecipientId] = useState(DEFAULT_ADMIN_ID);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [manualRecipient, setManualRecipient] = useState("");

  const activeAdminId = useMemo(() => {
    const conv = conversations?.[0];
    return conv?.otherParticipant?._id || null;
  }, [conversations]);

  useEffect(() => {
    if (!recipientId) {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem("defaultAdminId")
          : null;
      if (stored) setRecipientId(stored);
    }
    getConversations()
      .then((data) => {
        const firstOther = data?.conversations?.[0]?.otherParticipant?._id;
        if (firstOther) {
          setRecipientId(firstOther);
          setActiveUserId(firstOther);
          getMessages(firstOther).catch(() => {});
        }
      })
      .catch(() => {});
  }, [getConversations, getMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    let targetId = recipientId || activeAdminId || DEFAULT_ADMIN_ID;
    setSendError("");
    if (!targetId) {
      setSendError("No admin recipient configured. Please try again later.");
      return;
    }
    try {
      setSending(true);
      const toastId = toast.loading("Sending...");
      setActiveUserId(targetId);
      await sendMessage({ recipientId: targetId, content: input.trim() });
      setInput("");
      getMessages(targetId).catch(() => {});
      toast.success("Sent", { id: toastId });
    } catch (err) {
      setSendError("Failed to send message. Please try again.");
      toast.error(
        typeof err?.message === "string" ? err.message : "Failed to send"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="min-h-screen bg-white px-4 py-16">
        <div className="max-w-lg mx-auto mt-10 rounded-2xl shadow-lg border border-lightgrey bg-white">
          <div className="bg-blue text-white font-semibold px-6 py-3 rounded-t-2xl">
            Customer Support
          </div>

          <div className="p-6 space-y-4 h-150 overflow-y-auto">
            <p className="text-center text-xs text-gray-400">Monday</p>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.sender?._id === user?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender?._id === user?._id
                      ? "bg-blue-100 text-black"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <p className="flex-1">{msg.content}</p>
                    {msg.sender?._id === user?._id && (
                      <button
                        onClick={async () => {
                          try {
                            await deleteMessage(msg._id);
                            toast.success("Message deleted");
                          } catch (e) {
                            toast.error("Failed to delete message");
                          }
                        }}
                        className="text-[10px] text-gray-500 hover:text-gray-700"
                        title="Delete"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 text-right mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  {msg.sender?._id === user?._id && (
                    <p className="text-[10px] text-gray-500 text-right mt-0.5">
                      {msg.isRead ? "Read" : "Sent"}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {!messages?.length && !recipientId && !DEFAULT_ADMIN_ID && (
              <div className="text-center text-xs text-gray-400">
                No active conversation. Please wait for an admin to reach out
                first, or configure NEXT_PUBLIC_DEFAULT_ADMIN_ID.
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t px-4 py-3"
          >
            <button type="button" className="text-blue">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your message here..."
              className="flex-1 border-none outline-none text-sm text-gray-700"
            />
            <button
              type="submit"
              className="text-blue"
              disabled={sending || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>
          {sendError && (
            <div className="px-4 pb-4 text-xs text-red-600">{sendError}</div>
          )}
          {sending && (
            <div className="px-4 pb-4 text-xs text-gray-500">Sending...</div>
          )}
          {!messages?.length && !recipientId && !DEFAULT_ADMIN_ID && (
            <div className="px-4 pb-6">
              <div className="text-xs text-gray-500 mb-2">
                No admin recipient configured. Paste an Admin User ID to start a
                chat.
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualRecipient}
                  onChange={(e) => setManualRecipient(e.target.value)}
                  placeholder="Admin User ID"
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => {
                    if (!manualRecipient.trim()) return;
                    setRecipientId(manualRecipient.trim());
                    try {
                      localStorage.setItem(
                        "defaultAdminId",
                        manualRecipient.trim()
                      );
                    } catch (_) {}
                  }}
                  className="text-xs px-3 py-1 rounded bg-blue text-white"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatSupport;
