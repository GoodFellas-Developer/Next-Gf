"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) return setError(error.message);

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 space-y-6"
        >
          <h1 className="text-3xl font-semibold text-center text-white">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-center text-sm">
            Login to continue
          </p>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
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
          </div>

          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-lg">
            Login
          </button>

          <p className="text-center text-gray-300 text-sm">
            No account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
