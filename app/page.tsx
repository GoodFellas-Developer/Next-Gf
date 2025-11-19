"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/dashboard"); // redirect logged-in users
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to MyApp</h1>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Register
        </a>
      </div>
    </div>
  );
}
