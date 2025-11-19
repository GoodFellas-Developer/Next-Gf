"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { UserPen } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="w-full bg-black border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="text-2xl font-bold text-white">
          Good<span className="text-[#FED402]">Fellas</span>
        </Link>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg"
            >
              <span className="font-medium text-gray-700">
                <UserPen />
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
                {/* <Link
                  href="/dashboard/profile"
                  className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"npm install lucide-react
                  className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                >
                  Settings
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <Link
            href="/dashboard/profile"
            className="block px-6 py-4 hover:bg-gray-100 text-gray-700"
          >
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-6 py-4 hover:bg-gray-100 text-gray-700"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-4 text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
