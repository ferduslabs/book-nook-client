"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import RequireAuth from "@/components/RequireAuth";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

function AddBookForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: "1",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch(
        "/books",
        {
          method: "POST",
          body: JSON.stringify({
            ...form,
            totalCopies: Number(form.totalCopies) || 1,
            userName: session?.user?.name,
          }),
        },
        true
      );
      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">Add a New Book</h1>
      <p className="mt-1 text-sm text-stone-600">
        Share a book with the BookNook community.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700">Title</label>
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
            placeholder="Book title"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700">Author</label>
          <input
            name="author"
            required
            value={form.author}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
            placeholder="Author name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-stone-700">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">
              Total Copies
            </label>
            <input
              name="totalCopies"
              type="number"
              min={1}
              required
              value={form.totalCopies}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700">
            Cover Image URL
          </label>
          <input
            name="image"
            type="url"
            required
            value={form.image}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700">
            Short Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
            placeholder="What is this book about?"
          />
        </div>

        {/* read-only user info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-stone-700">
              Your Name
            </label>
            <input
              readOnly
              value={session?.user?.name || ""}
              className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-100 px-3 py-2 text-stone-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">
              Your Email
            </label>
            <input
              readOnly
              value={session?.user?.email || ""}
              className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-100 px-3 py-2 text-stone-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-800 py-3 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default function AddBookClient() {
  return (
    <RequireAuth>
      <AddBookForm />
    </RequireAuth>
  );
}
