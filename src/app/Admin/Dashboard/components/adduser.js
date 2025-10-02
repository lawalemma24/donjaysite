"use client";

import { useState } from "react";

import { X } from "lucide-react";
import Modal from "./modal";

import { Mail } from "lucide-react";

export default function AddUserModal({
  onClose = () => {},
  onInvite = (email) => {},
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  function handleInvite() {
    if (!email) return;
    setSending(true);
    setTimeout(() => {
      // emulate API
      onInvite(email);
      setSending(false);
    }, 900);
  }

  return (
    <Modal open onClose={onClose} size="sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X />
      </button>
      <div className="flex flex-col items-center ">
        <Mail className="w-12 h-12 text-blue block mx-auto mb-1" />
        <h3 className="text-xl font-semibold">Invite User</h3>
      </div>
      <p className="text-text-muted/70 text-sm mb-4 mt-2 text-center">
        Enter the email address to invite user
      </p>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-text-muted/60 focus:outline-none focus:ring-none focus:border-blue"
        />

        <div className="flex justify-between gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-md bg-gray-100 border border-blue text-blue"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={sending || !email}
            className="px-4 py-2 rounded-md bg-blue text-white"
          >
            {sending ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
