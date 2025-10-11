"use client";
import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const ChatSupport = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How can I assist you today?",
      sender: "bot",
      time: "1:00",
    },
    {
      id: 2,
      text: "Hi, I’m interested in swapping my 2022 Toyota Corolla for a 2025 Honda Accord. How do I start?",
      sender: "user",
      time: "2:00",
    },
    {
      id: 3,
      text: "Thanks for reaching out. You can begin by filling in your car details under the Swap Cars section. Would you like me to send you the direct link?",
      sender: "bot",
      time: "3:00",
    },
    {
      id: 4,
      text: "Yes, please. Also, will my car need an inspection before the swap?",
      sender: "user",
      time: "4:00",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), text: input, sender: "user", time: "now" },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-lg mx-auto mt-10 rounded-2xl shadow-lg border border-lightgrey bg-white">
        <div className="bg-blue text-white font-semibold px-6 py-3 rounded-t-2xl">
          Customer Support
        </div>

        <div className="p-6 space-y-4 h-150 overflow-y-auto">
          <p className="text-center text-xs text-gray-400">Monday</p>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-black"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-[10px] text-gray-500 text-right mt-1">
                  {msg.time}
                </p>
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
          <button type="submit" className="text-blue">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSupport;
