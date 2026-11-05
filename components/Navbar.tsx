"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    ...(session
      ? [
          { href: "/add-book", label: "Add Book" },
          { href: "/my-books", label: "My Books" },
          { href: "/my-borrows", label: "My Borrows" },
        ]
      : []),
  ];

  async function handleLogout() {
    await signOut();
    setDropdownOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-amber-50/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-emerald-800" />
          <span className="text-xl font-bold text-emerald-900">BookNook</span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium hover:text-emerald-800 ${
                pathname === l.href ? "text-emerald-800 underline" : "text-stone-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* right side */}
        <div className="hidden items-center gap-3 md:flex">
          {!session ? (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-emerald-800 text-sm font-semibold text-white"
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  session.user.name?.charAt(0).toUpperCase()
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-stone-200 bg-white py-1 shadow-lg">
                  <p className="border-b border-stone-100 px-4 py-2 text-sm font-medium text-stone-900">
                    {session.user.name}
                  </p>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-stone-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-stone-800" />
          ) : (
            <Menu className="h-6 w-6 text-stone-800" />
          )}
        </button>
      </nav>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="border-t border-stone-200 bg-amber-50 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700"
            >
              {l.label}
            </Link>
          ))}
          {!session ? (
            <div className="mt-2 flex gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="mt-2 text-sm font-medium text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
