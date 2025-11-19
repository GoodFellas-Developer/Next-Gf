"use client";

import { Contact } from "@/lib/contacts";

type Props = {
  open: boolean;
  contact: Contact | null;
  setContact: (c: Contact | null) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function EditContactModal({
  open,
  contact,
  setContact,
  onClose,
  onConfirm,
}: Props) {
  if (!open || !contact) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Edit Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={contact.fname}
            onChange={(e) => setContact({ ...contact, fname: e.target.value })}
            className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
          <input
            type="text"
            value={contact.lname}
            onChange={(e) => setContact({ ...contact, lname: e.target.value })}
            className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
          <input
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
