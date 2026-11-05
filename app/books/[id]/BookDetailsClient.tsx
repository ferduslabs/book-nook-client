"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch, type Book } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import RequireAuth from "@/components/RequireAuth";
import Spinner from "@/components/Spinner";

function Details({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    apiFetch(`/books/${id}`)
      .then(setBook)
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleBorrow() {
    if (!book) return;
    setBorrowing(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id }),
      }, true);
      toast.success("Book borrowed successfully!");
      // copy কমে গেছে, তাই বই আবার আনি
      const updated = await apiFetch(`/books/${book._id}`);
      setBook(updated);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to borrow");
    } finally {
      setBorrowing(false);
    }
  }

  if (loading) return <Spinner />;
  if (!book) {
    return (
      <p className="py-16 text-center text-stone-500">Book not found.</p>
    );
  }

  const isOwner = session?.user?.email === book.userEmail;
  const notAvailable = book.availableCopies <= 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-emerald-800/10 px-3 py-1 text-xs font-medium text-emerald-900">
            {book.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-stone-900">
            {book.title}
          </h1>
          <p className="mt-1 text-lg text-stone-600">by {book.author}</p>

          <p className="mt-5 leading-relaxed text-stone-700">
            {book.description}
          </p>

          <div className="mt-6 space-y-1 text-sm text-stone-600">
            <p>
              <span className="font-medium text-stone-900">Added by:</span>{" "}
              {book.userName || book.userEmail}
            </p>
            <p>
              <span className="font-medium text-stone-900">Available:</span>{" "}
              {book.availableCopies} of {book.totalCopies} copies
            </p>
          </div>

          {isOwner ? (
            <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-stone-700">
              You added this book, so you cannot borrow it.
            </p>
          ) : notAvailable ? (
            <button
              disabled
              className="mt-6 w-full rounded-lg bg-stone-300 py-3 text-sm font-medium text-stone-500"
            >
              Not Available
            </button>
          ) : (
            <button
              onClick={handleBorrow}
              disabled={borrowing}
              className="mt-6 w-full rounded-lg bg-emerald-800 py-3 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-50"
            >
              {borrowing ? "Borrowing..." : "Borrow This Book"}
            </button>
          )}

          <button
            onClick={() => router.back()}
            className="mt-3 w-full rounded-lg border border-stone-300 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

// Details page private — guard দিয়ে ঘুরিয়ে দিচ্ছি
export default function BookDetailsClient({ id }: { id: string }) {
  return (
    <RequireAuth>
      <Details id={id} />
    </RequireAuth>
  );
}
