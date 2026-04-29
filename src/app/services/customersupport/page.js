"use client";

import { useEffect, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useAuth } from "@/app/contexts/AuthContext";
import useMessaging from "@/hooks/useMessaging";
import toast from "react-hot-toast";
import FAQSection from "../faqs/page";

const RECIPIENT_ID = "695e57ad0aebafe517ee189a";

const ChatSupport = () => {
  const { user } = useAuth();
  const { getMessages, sendMessage, messages, setActiveUserId } =
    useMessaging();

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  /**
   * Always talk to the hard-coded recipient
   */
  useEffect(() => {
    setActiveUserId(RECIPIENT_ID);
    getMessages(RECIPIENT_ID).catch(() => {});
  }, [getMessages, setActiveUserId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setSending(true);
      const toastId = toast.loading("Sending...");

      await sendMessage({
        content: input.trim(),
        recipientId: RECIPIENT_ID, // 🔥 hard-coded recipient
      });

      setInput("");
      toast.success("Sent", { id: toastId });

      // refresh messages
      getMessages(RECIPIENT_ID).catch(() => {});
    } catch (err) {
      toast.error("Failed to send message");
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
            {!messages?.length && (
              <p className="text-center text-xs text-gray-400">
                Start a conversation — an admin will reply shortly.
              </p>
            )}

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
                  <p>{msg.content}</p>

                  <p className="text-[10px] text-gray-500 text-right mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>

                  {msg.sender?._id === user?._id && (
                    <p className="text-[10px] text-gray-500 text-right">
                      {msg.isRead ? "Read" : "Sent"}
                    </p>
                  )}
                </div>
              </div>
            ))}
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

          {sending && (
            <div className="px-4 pb-4 text-xs text-gray-500">Sending...</div>
          )}
        </div>
      </div>

      <FAQSection />
    </ProtectedRoute>
  );
};

export default ChatSupport;
