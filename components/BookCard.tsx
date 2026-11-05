import Link from "next/link";
import type { Book } from "@/lib/api";

// একই card style সব জায়গায় ব্যবহার হবে (design consistency)
export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[3/4] w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="w-fit rounded-full bg-emerald-800/10 px-2 py-0.5 text-xs font-medium text-emerald-900">
          {book.category}
        </span>
        <h3 className="mt-1 line-clamp-1 font-semibold text-stone-900">
          {book.title}
        </h3>
        <p className="text-sm text-stone-600">{book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="mt-3 inline-block rounded-lg bg-emerald-800 px-4 py-2 text-center text-sm font-medium text-white hover:bg-emerald-900"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
