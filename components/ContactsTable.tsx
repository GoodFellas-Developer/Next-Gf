// "use client";

// import { Contact } from "@/lib/contacts";
// import { SquarePen, Trash } from "lucide-react";

// type Props = {
//   contacts: Contact[];
//   loading: boolean;
//   onEdit: (contact: Contact) => void;
//   onDelete: (id: string) => void;
// };

// export default function ContactsTable({
//   contacts,
//   loading,
//   onEdit,
//   onDelete,
// }: Props) {
//   return (
//     <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//       {loading ? (
//         <p className="text-center p-4 text-gray-400 animate-pulse">
//           Loading contacts...
//         </p>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="px-4 py-2 text-left text-gray-300 uppercase tracking-wider">
//                 First Name
//               </th>
//               <th className="px-4 py-2 text-left text-gray-300 uppercase tracking-wider">
//                 Last Name
//               </th>
//               <th className="px-4 py-2 text-left text-gray-300 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-4 py-2 text-left text-gray-300 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-4 py-2 text-center text-gray-300 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {contacts.map((contact) => (
//               <tr
//                 key={contact.id}
//                 className="hover:bg-gray-700 transition-colors"
//               >
//                 <td className="px-4 py-2 text-gray-200">{contact.fname}</td>
//                 <td className="px-4 py-2 text-gray-200">{contact.lname}</td>
//                 <td className="px-4 py-2 text-gray-200">{contact.phone}</td>
//                 <td className="px-4 py-2 text-gray-200">{contact.email}</td>
//                 <td className="px-4 py-2 flex flex-col sm:flex-row justify-center gap-2">
//                   <button
//                     onClick={() => onEdit(contact)}
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
//                   >
//                     <SquarePen />
//                   </button>
//                   <button
//                     onClick={() => onDelete(contact.id!)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
//                   >
//                     <Trash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {contacts.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-400">
//                   No contacts found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

"use client";

import { Contact } from "@/lib/contacts";
import { SquarePen, Trash } from "lucide-react";

type Props = {
  contacts: Contact[];
  loading: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
};

export default function ContactsTable({
  contacts,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      {loading ? (
        <p className="text-center p-4 text-gray-400 animate-pulse">
          Loading contacts...
        </p>
      ) : (
        <table className="min-w-full divide-y divide-gray-700 table-auto">
          <thead className="bg-gray-700">
            <tr>
              {["First Name", "Last Name", "Phone", "Email", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-3 sm:px-4 py-2 text-left sm:text-left text-gray-300 uppercase tracking-wider text-sm sm:text-base"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-3 sm:px-4 py-2 text-gray-200 text-sm sm:text-base">
                    {contact.fname}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-gray-200 text-sm sm:text-base">
                    {contact.lname}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-gray-200 text-sm sm:text-base">
                    {contact.phone}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-gray-200 text-sm sm:text-base">
                    {contact.email}
                  </td>
                  <td className="px-3 sm:px-4 py-2 flex flex-row justify-center gap-2">
                    <button
                      onClick={() => onEdit(contact)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all flex items-center justify-center"
                    >
                      <SquarePen className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={() => onDelete(contact.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all flex items-center justify-center"
                    >
                      <Trash className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-400 text-sm sm:text-base"
                >
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
