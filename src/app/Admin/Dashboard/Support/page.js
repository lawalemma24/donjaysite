"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Paperclip,
  Send,
  Phone,
  X,
  User,
  Trash2,
  Slash,
} from "lucide-react";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useAuth } from "@/app/contexts/AuthContext";
import useMessaging from "@/hooks/useMessaging";
import toast from "react-hot-toast";

/**
 * SupportCenter component
 *
 * - All / Unread tabs
 * - Conversation list (left)
 * - Chat area (right)
 * - Right-side profile panel (slides in, WhatsApp style)
 *
 * Tailwind CSS required in project.
 */

const initialConversations = [];

export default function SupportCenter() {
  const { user } = useAuth();
  const {
    conversations,
    conversationsPagination,
    messages,
    messagesPagination,
    getConversations,
    getMessages,
    sendMessage,
    markAsRead,
    deleteMessage,
  } = useMessaging();
  const [activeConvId, setActiveConvId] = useState(null);
  const [tab, setTab] = useState("all"); // "all" or "unread"
  const [profileOpenFor, setProfileOpenFor] = useState(null);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getConversations()
      .then((data) => {
        if (data?.conversations?.length) {
          setActiveConvId(data.conversations[0].conversationId);
          const firstOther = data.conversations[0].otherParticipant?._id;
          if (firstOther) getMessages(firstOther);
        }
      })
      .catch(() => {});
  }, [getConversations, getMessages]);

  const activeConv = conversations.find(
    (c) => c.conversationId === activeConvId
  );

  useEffect(() => {
    // scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages?.length]);

  function selectConversation(conversationId) {
    setActiveConvId(conversationId);
    const conv = conversations.find((c) => c.conversationId === conversationId);
    if (conv?.otherParticipant?._id) {
      getMessages(conv.otherParticipant._id)
        .then(() => {
          // mark last message as read if needed
          const last = conv.lastMessage;
          if (last && !last.isRead && last.recipient?._id === user?._id) {
            markAsRead(last._id).catch(() => {});
          }
        })
        .catch(() => {});
    }
  }

  function handleSend() {
    if (!messageText.trim() || !activeConv) return;
    const recipientId = activeConv.otherParticipant?._id;
    if (!recipientId) return;
    const toastId = toast.loading("Sending...");
    sendMessage({ recipientId, content: messageText.trim() })
      .then(() => {
        toast.success("Sent", { id: toastId });
      })
      .catch((e) => {
        toast.error(typeof e?.message === "string" ? e.message : "Failed to send");
      })
      .finally(() => {
        setMessageText("");
        getMessages(recipientId).catch(() => {});
      });
  }

  function openProfile(conversationId) {
    setProfileOpenFor(conversationId);
  }

  function toggleBlock(conversationId) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, blocked: !c.blocked } : c
      )
    );
  }

  function clearChat(conversationId) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [], lastMessage: "", lastAt: "", unreadCount: 0 }
          : c
      )
    );
    // if clearing active conv, keep it but messages empty
  }

  const filteredConversations =
    tab === "all"
      ? conversations
      : conversations.filter((c) => c.unreadCount && c.unreadCount > 0);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-6 sticky top-[100px] min-h-[calc(100vh-64px)]">
        <div className="max-w-[1100px] mx-auto bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-12 grid-rows-1">
            {/* Left column - list */}
            <div className="col-span-4 min-h-[80vh] border-r border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Support Center</h2>
                  <p className="text-sm text-gray-500">
                    Manage and respond to customer inquiries in real time
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm px-2 py-1 rounded-full bg-green-50 text-green-600">
                    Online
                  </span>
                </div>
              </div>

              {/* search */}
              <div className="mb-4">
                <input
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400"
                  placeholder="Search conversation"
                />
              </div>

              {/* tabs */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setTab("all")}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tab === "all" ? "bg-blue/40 text-blue" : "text-gray-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTab("unread")}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tab === "unread" ? "bg-blue/20 text-blue" : "text-gray-600"
                  }`}
                >
                  Unread
                </button>
              </div>

              {/* conversation list */}
              <div className="space-y-2 overflow-y-auto max-h-[64vh] pr-2">
                {filteredConversations.map((c) => {
                  const active = c.conversationId === activeConvId;
                  return (
                    <div
                      key={c.conversationId}
                      onClick={() => selectConversation(c.conversationId)}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer border-l-4 ${
                        active
                          ? "bg-blue/50 border-blue/50"
                          : "border-transparent"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={
                            c.otherParticipant?.profilePic ||
                            "https://placehold.co/80x80"
                          }
                          alt={c.otherParticipant?.name || "User"}
                          className="w-10 h-10 rounded-full object-cover"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProfile(c.conversationId);
                          }}
                        />
                        {c.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {c.unreadCount}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold truncate">
                              {c.otherParticipant?.name || "Conversation"}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(
                              c.lastMessage?.createdAt || Date.now()
                            ).toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 truncate">
                          {c.lastMessage?.content || ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column - chat */}
            <div className="col-span-8 flex flex-col min-h-[80vh] max-h-[80vh]">
              {/* header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    className="hidden md:inline-flex items-center gap-2 p-1 rounded hover:bg-gray-100"
                    onClick={() => {
                      /* In a responsive app you could collapse left panel */
                    }}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  {activeConv ? (
                    <>
                      <img
                        src={
                          activeConv.otherParticipant?.profilePic ||
                          "https://placehold.co/80x80"
                        }
                        alt={activeConv.otherParticipant?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover"
                        onClick={() => openProfile(activeConv.conversationId)}
                      />
                      <div>
                        <div className="font-semibold">
                          {activeConv.otherParticipant?.name || "Conversation"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activeConv.otherParticipant?.email || ""}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">
                          Select a conversation
                        </div>
                        <div className="text-xs text-gray-500">—</div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <Phone size={18} />
                  </button>
                </div>
              </div>

              {/* messages area */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                {!activeConv && (
                  <div className="text-center text-gray-400">
                    No conversation
                  </div>
                )}

                {activeConv && (
                  <div className="space-y-6 max-w-3xl">
                    {messages.map((m) => (
                      <div
                        key={m._id}
                        className={`flex ${
                          m.sender?._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                            m.sender?._id === user?._id
                              ? "bg-blue text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <div className="whitespace-pre-wrap flex items-start gap-2">
                            <div className="flex-1">{m.content}</div>
                            {m.sender?._id === user?._id && (
                              <button
                                onClick={async () => {
                                  try {
                                    await deleteMessage(m._id);
                                    toast.success("Message deleted");
                                  } catch (e) {
                                    toast.error("Failed to delete message");
                                  }
                                }}
                                className={`text-[10px] ${m.sender?._id === user?._id ? "text-white/80 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
                                title="Delete"
                              >
                                ×
                              </button>
                            )}
                          </div>
                          <div
                            className={`text-xs mt-2 ${
                              m.sender?._id === user?._id
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </div>
                          {m.sender?._id === user?._id && (
                            <div className={`text-[10px] mt-0.5 ${m.sender?._id === user?._id ? "text-white/80" : "text-gray-500"}`}>
                              {m.isRead ? "Read" : "Sent"}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* input */}
              <div className="px-6 pb-6 pt-2">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
                  <button className="p-2 rounded hover:bg-gray-100">
                    <Paperclip size={18} />
                  </button>
                  <input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Write your message here..."
                    className="flex-1 text-sm placeholder:text-gray-400 outline-none"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 rounded bg-blue text-white hover:bg-blue"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right-side profile panel (WhatsApp-style slide-in) */}
        <div
          className={`fixed right-0 top-20 h-full w-[360px] bg-white border-l border-gray-100 shadow-lg transform transition-transform duration-300 ${
            profileOpenFor ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!profileOpenFor}
        >
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setProfileOpenFor(null)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <X size={18} />
              </button>
              {profileOpenFor && (
                <>
                  <img
                    src={
                      conversations.find(
                        (c) => c.conversationId === profileOpenFor
                      )?.otherParticipant?.profilePic ||
                      "https://placehold.co/80x80"
                    }
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">
                      {conversations.find(
                        (c) => c.conversationId === profileOpenFor
                      )?.otherParticipant?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {conversations.find(
                        (c) => c.conversationId === profileOpenFor
                      )?.otherParticipant?.email || ""}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-72px)]">
            {profileOpenFor && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Contact info</div>
                  <button
                    onClick={() => setProfileOpenFor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm">
                    <strong>Email:</strong> user+{profileOpenFor}@example.com
                  </div>
                  <div className="text-sm mt-1">
                    <strong>Phone:</strong> +234 801 000 0000
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    Quick actions
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => {}}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded border hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Slash size={16} />
                        <span>Block user</span>
                      </div>
                      <span className="text-xs text-gray-500">—</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">More</div>
                  <div className="text-sm text-gray-600">
                    You can also view full profile, disable notifications, or
                    escalate this chat to a supervisor.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
