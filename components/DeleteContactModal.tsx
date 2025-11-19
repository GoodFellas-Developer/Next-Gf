"use client";

import { CircleAlert } from "lucide-react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteContactModal({
  open,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg border-2 border-red-600 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-600 text-white rounded-full p-4 mb-4">
            <CircleAlert className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Are you sure?</h2>
          <p className="text-gray-300 mb-6">
            This action{" "}
            <span className="font-semibold text-red-400">cannot be undone</span>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-all shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg animate-pulse"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
