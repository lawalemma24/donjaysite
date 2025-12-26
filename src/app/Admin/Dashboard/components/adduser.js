"use client";

import { useState } from "react";
import { X, Mail } from "lucide-react";
import Modal from "./modal";
import toast from "react-hot-toast";
import { apiUrl } from "@/utils/apihelper";

export default function AddUserModal({
  onClose = () => {},
  onInvite = () => {},
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleInvite() {
    if (!email || !token) return;

    try {
      setSending(true);

      const res = await fetch(apiUrl("/api/invite"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to invite admin");
      }

      toast.success("Admin invited successfully");
      onInvite(data.user); // pass created admin back to parent
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal open onClose={onClose} size="sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X />
      </button>

      <div className="flex flex-col items-center">
        <Mail className="w-12 h-12 text-blue block mx-auto mb-1" />
        <h3 className="text-xl font-semibold">Invite Admin</h3>
      </div>

      <p className="text-text-muted/70 text-sm mb-4 mt-2 text-center">
        Enter the email address to invite a new administrator
      </p>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-text-muted/60 focus:outline-none focus:border-blue"
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
            className="px-4 py-2 rounded-md bg-blue text-white disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
