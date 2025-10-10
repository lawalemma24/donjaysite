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

const initialConversations = [
  {
    id: "conv-1",
    name: "Don Jay",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
    online: true,
    lastMessage: "Hi, I’m interested in swapping my 2022 Toyota Corolla...",
    lastAt: "2m",
    unreadCount: 0,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Hi, I'm interested in swapping my 2022 Toyota Corolla for a 2025 Honda Accord. How do I start?",
        time: "2:00 PM",
      },
      {
        id: "m2",
        sender: "me",
        text: "Thanks for reaching out. You can begin by filling in your car details under the Swap Cars section. Would you like me to send the direct link?",
        time: "3:00 PM",
      },
      {
        id: "m3",
        sender: "user",
        text: "Yes, please. Also, will my car need an inspection before the swap?",
        time: "4:00 PM",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Mira David",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "Can I schedule for my car inspection?",
    lastAt: "15m",
    unreadCount: 5,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Can I schedule for my car inspection?",
        time: "10:10 AM",
      },
    ],
  },
  {
    id: "conv-3",
    name: "John Walter",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "Thank you for your quick service.",
    lastAt: "1hr",
    unreadCount: 2,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Thank you for your quick service.",
        time: "9:30 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Sandra John",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "What document do i need for...",
    lastAt: "2hr",
    unreadCount: 1,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "What document do i need for...",
        time: "7:30 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Sandra John",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "What document do i need for...",
    lastAt: "2hr",
    unreadCount: 1,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "What document do i need for...",
        time: "7:30 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Sandra John",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "What document do i need for...",
    lastAt: "2hr",
    unreadCount: 1,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "What document do i need for...",
        time: "7:30 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Sandra John",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "What document do i need for...",
    lastAt: "2hr",
    unreadCount: 1,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "What document do i need for...",
        time: "7:30 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Sandra John",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "What document do i need for...",
    lastAt: "2hr",
    unreadCount: 1,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "What document do i need for...",
        time: "7:30 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Sandra John",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    online: false,
    lastMessage: "What document do i need for...",
    lastAt: "2hr",
    unreadCount: 1,
    blocked: false,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "What document do i need for...",
        time: "7:30 AM",
      },
    ],
  },
];

export default function SupportCenter() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState(conversations[0].id);
  const [tab, setTab] = useState("all"); // "all" or "unread"
  const [profileOpenFor, setProfileOpenFor] = useState(null);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  // ensure active conv exists after actions
  useEffect(() => {
    if (
      !conversations.find((c) => c.id === activeConvId) &&
      conversations.length
    ) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    // scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages?.length]);

  function selectConversation(id) {
    setActiveConvId(id);
    // mark as read (clear unreadCount)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  }

  function sendMessage() {
    if (!messageText.trim() || !activeConv) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMsg.text,
              lastAt: "now",
            }
          : c
      )
    );
    setMessageText("");
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
                  const active = c.id === activeConvId;
                  return (
                    <div
                      key={c.id}
                      onClick={() => selectConversation(c.id)}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer border-l-4 ${
                        active
                          ? "bg-blue/50 border-blue/50"
                          : "border-transparent"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProfile(c.id);
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
                              {c.name}
                            </div>
                            {c.online && (
                              <div className="text-[10px] text-green-600">
                                ●
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {c.lastAt}
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 truncate">
                          {c.lastMessage}
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
                        src={activeConv.avatar}
                        alt={activeConv.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onClick={() => openProfile(activeConv.id)}
                      />
                      <div>
                        <div className="font-semibold">{activeConv.name}</div>
                        <div className="text-xs text-gray-500">
                          {activeConv.online ? "Online" : "Offline"}
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
                    {activeConv.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${
                          m.sender === "me" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                            m.sender === "me"
                              ? "bg-blue text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{m.text}</div>
                          <div
                            className={`text-xs mt-2 ${
                              m.sender === "me"
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {m.time}
                          </div>
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
                        sendMessage();
                      }
                    }}
                    placeholder="Write your message here..."
                    className="flex-1 text-sm placeholder:text-gray-400 outline-none"
                  />
                  <button
                    onClick={sendMessage}
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
                      conversations.find((c) => c.id === profileOpenFor)?.avatar
                    }
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">
                      {conversations.find((c) => c.id === profileOpenFor)?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {conversations.find((c) => c.id === profileOpenFor)
                        ?.online
                        ? "Online"
                        : "Offline"}
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
                      onClick={() => toggleBlock(profileOpenFor)}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded border hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Slash size={16} />
                        <span>Block user</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {conversations.find((c) => c.id === profileOpenFor)
                          ?.blocked
                          ? "Blocked"
                          : "Block"}
                      </span>
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
