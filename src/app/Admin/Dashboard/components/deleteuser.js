"use client";

import Modal from "./modal";

export default function DeleteUserConfirm({
  user,
  onClose = () => {},
  onConfirm = () => {},
}) {
  if (!user) return null;

  return (
    <Modal open onClose={onClose} size="sm">
      <div className="text-center py-6 px-4">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-15 h-15 flex items-center justify-center rounded-full ">
            <span className="text-yellow-500 text-4xl">⚠️</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">Delete User</h3>

        {/* Message */}
        <p className="text-sm text-gray-500 mb-6">
          Do you really want to delete this user? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md border border-blue text-sm font-medium text-blue hover:bg-blue/10"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(user.id)}
            className="px-5 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
