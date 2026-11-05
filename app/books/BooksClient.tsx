"use client";

import { useEffect, useState } from "react";
import { apiFetch, type Book } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";

export default function BooksClient() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/books")
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">All Books</h1>
      <p className="mt-1 text-sm text-stone-600">
        Browse every book shared by our community.
      </p>

      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="py-16 text-center text-stone-500">
          No books available yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b._id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
