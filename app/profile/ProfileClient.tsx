"use client";

import { useSession } from "@/lib/auth-client";
import RequireAuth from "@/components/RequireAuth";

function Profile() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-emerald-800 text-2xl font-bold text-white">
          {session?.user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            session?.user?.name?.charAt(0).toUpperCase()
          )}
        </div>
        <h1 className="mt-4 text-xl font-bold text-stone-900">
          {session?.user?.name}
        </h1>
        <p className="mt-1 text-sm text-stone-600">{session?.user?.email}</p>
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-xs text-stone-600">
          This is your BookNook account. You can add books, borrow from the
          library, and manage your borrows.
        </p>
      </div>
    </div>
  );
}

export default function ProfileClient() {
  return (
    <RequireAuth>
      <Profile />
    </RequireAuth>
  );
}
