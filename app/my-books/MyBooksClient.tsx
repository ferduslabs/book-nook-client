"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { apiFetch, type Book } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import RequireAuth from "@/components/RequireAuth";
import DeleteModal from "@/components/DeleteModal";
import Spinner from "@/components/Spinner";

function MyBooks() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadBooks = useCallback(() => {
    if (!session?.user?.email) return;
    apiFetch(`/books?email=${encodeURIComponent(session.user.email)}`)
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, [session?.user?.email]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/books/${deleteTarget._id}`, { method: "DELETE" }, true);
      toast.success("Book deleted successfully");
      setDeleteTarget(null);
      loadBooks();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">My Books</h1>
          <p className="mt-1 text-sm text-stone-600">
            Books you have added to BookNook.
          </p>
        </div>
        <Link
          href="/add-book"
          className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900"
        >
          Add Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="py-16 text-center text-stone-500">
          You have not added any books yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-left text-sm text-stone-600">
                <th className="py-3 pr-4">Book</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Copies</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id} className="border-b border-stone-100">
                  <td className="flex items-center gap-3 py-3 pr-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.image}
                      alt={b.title}
                      className="h-14 w-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-stone-900">{b.title}</p>
                      <p className="text-sm text-stone-500">{b.author}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-stone-700">
                    {b.category}
                  </td>
                  <td className="py-3 pr-4 text-sm text-stone-700">
                    {b.availableCopies}/{b.totalCopies}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/my-books/edit/${b._id}`}
                      className="mr-2 inline-block rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(b)}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteModal
        open={!!deleteTarget}
        title={deleteTarget?.title || ""}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default function MyBooksClient() {
  return (
    <RequireAuth>
      <MyBooks />
    </RequireAuth>
  );
}
