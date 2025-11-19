"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
    gmail: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // STEP 1: Create Supabase auth user
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) return setError(error.message);

    // STEP 2: Save extra profile info
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        fname: form.fname,
        lname: form.lname,
        phone: form.phone,
        gmail: form.gmail,
      });
    }

    // Notify user to check email for confirmation
    setSuccess(
      "Registration successful! Please check your email to confirm your account before logging in."
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 space-y-6">
          <h1 className="text-3xl font-semibold text-center text-white">
            Create Account
          </h1>
          <p className="text-gray-300 text-center text-sm">
            Fill in your details to register
          </p>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 text-green-300 p-3 rounded-lg text-sm text-center">
              {success}
            </div>
          )}

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 outline-none transition"
              value={form.fname}
              onChange={(e) => setForm({ ...form, fname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 outline-none transition"
              value={form.lname}
              onChange={(e) => setForm({ ...form, lname: e.target.value })}
            />
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 outline-none transition"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="email"
            placeholder="Gmail Address"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 outline-none transition"
            value={form.gmail}
            onChange={(e) => setForm({ ...form, gmail: e.target.value })}
          />

          <input
            type="email"
            placeholder="Login Email"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 outline-none transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 outline-none transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-lg"
          >
            Register
          </button>

          <p className="text-center text-gray-300 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
