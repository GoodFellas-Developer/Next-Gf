"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import {
  Contact,
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "@/lib/contacts";

import AddContactForm from "@/components/AddContactForm";
import ContactsTable from "@/components/ContactsTable";
import EditContactModal from "@/components/EditContactModal";
import ConfirmUpdateModal from "@/components/ConfirmUpdateModal";
import DeleteContactModal from "@/components/DeleteContactModal";
import Toast from "@/ui/Toast";
import { CirclePlus } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  const [contactForm, setContactForm] = useState<Contact>({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });

  const [modalOpen, setModalOpen] = useState(false); // <-- New state for modal

  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const loadContacts = async (userId: string) => {
    setContactsLoading(true);
    const data = await getContacts(userId);
    setContacts(data);
    setContactsLoading(false);
  };

  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
        return;
      }
      setUser(data.session.user);
      await loadContacts(data.session.user.id);
      setLoading(false);
    };
    initialize();
  }, [router]);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addContact(contactForm, user.id);
      setToast({ message: "Contact added successfully!", type: "success" });
      setContactForm({ fname: "", lname: "", phone: "", email: "" });
      setModalOpen(false); // <-- close modal after adding
      await loadContacts(user.id);
    } catch {
      setToast({ message: "Failed to add contact.", type: "error" });
    }
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (contact: Contact) => {
    setEditContact(contact);
    setShowEditModal(true);
  };

  const handleConfirmUpdate = () => {
    setShowEditModal(false);
    setShowConfirmUpdate(true);
  };

  const handleUpdateContact = async () => {
    if (!editContact || !user) return;
    try {
      await updateContact(editContact.id!, editContact, user.id);
      setToast({ message: "Contact updated successfully!", type: "success" });
      setEditContact(null);
      await loadContacts(user.id);
    } catch {
      setToast({ message: "Failed to update contact.", type: "error" });
    }
    setShowConfirmUpdate(false);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async () => {
    if (!deleteId || !user) return;
    try {
      await deleteContact(deleteId, user.id);
      setToast({ message: "Contact deleted successfully!", type: "success" });
      await loadContacts(user.id);
    } catch {
      setToast({ message: "Failed to delete contact.", type: "error" });
    }
    setShowDeleteModal(false);
    setDeleteId(null);
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        <span className="text-lg font-medium animate-pulse">
          Loading dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="flex-1 py-12 w-full">
        {toast && <Toast message={toast.message} type={toast.type} />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold mb-2 text-white">Dashboard</h1>
          <p className="text-gray-300 text-lg mb-8">
            Welcome back,{" "}
            <span className="text-blue-400 font-semibold">{user?.email}</span>
          </p>

          {/* Add Contact Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all mb-6 flex items-center gap-2"
          >
            <CirclePlus />
            Add Contacts
          </button>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
                {/* Close button */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
                >
                  &times;
                </button>

                <h2 className="text-2xl font-semibold text-white mb-4">
                  Add New Contact
                </h2>

                {/* Form */}
                <AddContactForm
                  contactForm={contactForm}
                  setContactForm={setContactForm}
                  handleAddContact={handleAddContact}
                />
              </div>
            </div>
          )}

          <ContactsTable
            contacts={contacts}
            loading={contactsLoading}
            onEdit={handleEdit}
            onDelete={(id) => {
              setDeleteId(id);
              setShowDeleteModal(true);
            }}
          />

          <EditContactModal
            open={showEditModal}
            contact={editContact}
            setContact={setEditContact}
            onClose={() => setShowEditModal(false)}
            onConfirm={handleConfirmUpdate}
          />

          <ConfirmUpdateModal
            open={showConfirmUpdate}
            onCancel={() => setShowConfirmUpdate(false)}
            onConfirm={handleUpdateContact}
          />

          <DeleteContactModal
            open={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
