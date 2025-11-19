import { supabase } from "./supabase";

export type Contact = {
  id?: string;
  fname: string;
  lname: string;
  phone?: string;
  email: string;
  user_id?: string;
};

// Get contacts for a specific user
export async function getContacts(userId: string) {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Add a new contact for a specific user
export async function addContact(contact: Contact, userId: string) {
  const { data, error } = await supabase
    .from("contacts")
    .insert({ ...contact, user_id: userId })
    .select();
  if (error) throw error;
  return data[0];
}

// Update a contact, but only for the specific user
export async function updateContact(
  id: string,
  contact: Partial<Contact>,
  userId: string
) {
  const { data, error } = await supabase
    .from("contacts")
    .update(contact)
    .eq("id", id)
    .eq("user_id", userId) // <-- ensures user can't update others' contacts
    .select();
  if (error) throw error;
  return data[0];
}

// Delete a contact, only for the specific user
export async function deleteContact(id: string, userId: string) {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
  return true;
}
