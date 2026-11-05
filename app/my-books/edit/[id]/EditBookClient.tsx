"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch, type Book } from "@/lib/api";
import RequireAuth from "@/components/RequireAuth";
import Spinner from "@/components/Spinner";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: "1",
  });

  // prefilled form — আগের data নিয়ে আসে
  useEffect(() => {
    apiFetch(`/books/${id}`)
      .then((b: Book) => {
        setBook(b);
        setForm({
          title: b.title,
          author: b.author,
          category: b.category,
          image: b.image,
          description: b.description,
          totalCopies: String(b.totalCopies),
        });
      })
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch(
        `/books/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...form,
            totalCopies: Number(form.totalCopies) || 0,
          }),
        },
        true
      );
      toast.success("Book updated successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Spinner />;
  if (!book) return <p className="py-16 text-center text-stone-500">Book not found.</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">Edit Book</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700">Title</label>
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-800"
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
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-stone-700">Category</label>
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
              min={0}
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
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-lg bg-emerald-800 py-3 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/my-books")}
            className="rounded-lg border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditBookClient({ id }: { id: string }) {
  return (
    <RequireAuth>
      <EditForm id={id} />
    </RequireAuth>
  );
}
