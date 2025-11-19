// "use client";

// type Props = {
//   open: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
// };

// export default function ConfirmUpdateModal({
//   open,
//   onCancel,
//   onConfirm,
// }: Props) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg">
//         <h2 className="text-xl font-semibold text-white mb-4">
//           Confirm Update
//         </h2>
//         <p className="text-gray-400 mb-6">
//           Are you sure you want to update this contact? This action cannot be
//           undone.
//         </p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { CheckCircle2 } from "lucide-react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmUpdateModal({
  open,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg border-2 border-blue-500 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-500 text-white rounded-full p-4 mb-4">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Confirm Update</h2>
          <p className="text-gray-300 mb-6">
            Are you sure you want to update this contact?{" "}
            <span className="font-semibold text-blue-400">
              This action cannot be undone.
            </span>
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
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg animate-pulse"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
