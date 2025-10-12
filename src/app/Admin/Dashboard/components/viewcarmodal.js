"use client";

import { X } from "lucide-react";
import Modal from "./modal";

export default function ViewCarModal({ user, onClose = () => {} }) {
  if (!user) return null;

  return (
    <Modal open onClose={onClose} size="sm">
      <div className="max-w-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-black font-semibold">User Profile</h3>
          <button
            onClick={onClose}
            className="text-gray-500  hover:text-gray-700"
          >
            <X size={28} />
          </button>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
          <span
            className={`ml-auto px-3 py-1 text-xs rounded-full ${
              user.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 border-text-muted/60 focus:outline-none focus:ring-none "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 border-text-muted/60 focus:outline-none focus:ring-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={user.phone}
              readOnly
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 border-text-muted/60 focus:outline-none focus:ring-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Whatsapp Number
            </label>
            <input
              type="text"
              value={user.whatsapp}
              readOnly
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 border-text-muted/60 focus:outline-none focus:ring-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <input
              type="text"
              value={user.address}
              readOnly
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 border-text-muted/60 focus:outline-none focus:ring-none"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
