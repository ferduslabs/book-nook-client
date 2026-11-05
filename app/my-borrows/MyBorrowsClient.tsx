"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch, type Borrow } from "@/lib/api";
import RequireAuth from "@/components/RequireAuth";
import Spinner from "@/components/Spinner";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Borrows() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  const loadBorrows = useCallback(() => {
    apiFetch("/borrows", {}, true)
      .then(setBorrows)
      .catch(() => setBorrows([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadBorrows();
  }, [loadBorrows]);

  async function handleReturn(id: string) {
    setReturningId(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" }, true);
      toast.success("Book returned successfully!");
      loadBorrows();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to return");
    } finally {
      setReturningId(null);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">My Borrows</h1>
      <p className="mt-1 text-sm text-stone-600">
        Books you have borrowed — each borrow lasts 7 days.
      </p>

      {borrows.length === 0 ? (
        <p className="py-16 text-center text-stone-500">
          You have not borrowed any books yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-left text-sm text-stone-600">
                <th className="py-3 pr-4">Book</th>
                <th className="py-3 pr-4">Borrow Date</th>
                <th className="py-3 pr-4">Return Date</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id} className="border-b border-stone-100">
                  <td className="flex items-center gap-3 py-3 pr-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.bookImage}
                      alt={b.bookTitle}
                      className="h-14 w-10 rounded object-cover"
                    />
                    <p className="font-medium text-stone-900">{b.bookTitle}</p>
                  </td>
                  <td className="py-3 pr-4 text-sm text-stone-700">
                    {formatDate(b.borrowDate)}
                  </td>
                  <td className="py-3 pr-4 text-sm text-stone-700">
                    {formatDate(b.returnDate)}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleReturn(b._id)}
                      disabled={returningId === b._id}
                      className="rounded-lg bg-emerald-800 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-50"
                    >
                      {returningId === b._id ? "Returning..." : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MyBorrowsClient() {
  return (
    <RequireAuth>
      <Borrows />
    </RequireAuth>
  );
}
