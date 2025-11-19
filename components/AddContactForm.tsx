"use client";

import { Contact } from "@/lib/contacts";

type Props = {
  contactForm: Contact;
  setContactForm: (contact: Contact) => void;
  handleAddContact: (e: React.FormEvent) => void;
};

export default function AddContactForm({
  contactForm,
  setContactForm,
  handleAddContact,
}: Props) {
  return (
    <form onSubmit={handleAddContact} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={contactForm.fname}
          onChange={(e) =>
            setContactForm({ ...contactForm, fname: e.target.value })
          }
          className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={contactForm.lname}
          onChange={(e) =>
            setContactForm({ ...contactForm, lname: e.target.value })
          }
          className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Phone"
          value={contactForm.phone}
          onChange={(e) =>
            setContactForm({ ...contactForm, phone: e.target.value })
          }
          className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={contactForm.email}
          onChange={(e) =>
            setContactForm({ ...contactForm, email: e.target.value })
          }
          className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all w-full md:w-auto"
      >
        Add Contact
      </button>
    </form>
  );
}
