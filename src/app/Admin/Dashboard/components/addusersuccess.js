"use client";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import Modal from "./modal";

export default function AddUserSuccess({ onClose = () => {} }) {
  return (
    <Modal open onClose={onClose} size="sm">
      <div className="text-center py-6">
        <AiOutlineExclamationCircle className="w-12 h-12 text-yellow-500 block mx-auto mb-7 mt-4" />
        <h3 className="text-xl font-semibold mb-2">Invite Sent</h3>
        <p className="text-sm text-gray-500 mb-4">
          User invite has been sent successfully.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-blue text-white"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
