"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BookOpen, Library, RotateCcw } from "lucide-react";
import { apiFetch, type Book } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";

const slides = [
  {
    title: "Welcome to BookNook",
    text: "A small online library where you can share and borrow books easily.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Add Your Books",
    text: "Share your favourite books with the community in just a few clicks.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Borrow & Return",
    text: "Borrow a book for 7 days and return it when you are done reading.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HomeClient() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // New Arrivals — সবার নতুন ৬টি বই
    apiFetch("/books?limit=6&sort=-createdAt")
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Slider */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          loop
          className="rounded-2xl"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div
                className="flex h-72 items-center rounded-2xl bg-cover bg-center sm:h-96"
                style={{ backgroundImage: `url(${s.image})` }}
              >
                <div className="h-full w-full rounded-2xl bg-black/50 p-8 sm:p-12">
                  <div className="flex h-full max-w-lg flex-col justify-center">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl">
                      {s.title}
                    </h1>
                    <p className="mt-3 text-stone-200">{s.text}</p>
                    <Link
                      href="/books"
                      className="mt-6 w-fit rounded-lg bg-emerald-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-900"
                    >
                      Browse Books
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">New Arrivals</h2>
            <p className="mt-1 text-sm text-stone-600">
              The latest books added by our community.
            </p>
          </div>
          <Link
            href="/books"
            className="rounded-lg border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
          >
            See All Books
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : books.length === 0 ? (
          <p className="py-12 text-center text-stone-500">
            No books added yet. Be the first to add one!
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>
        )}
      </section>

      {/* Extra section 1: How it works */}
      <section className="bg-amber-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold text-stone-900">
            How BookNook Works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Add a Book",
                text: "Sign up and add your favourite books with a cover image and description.",
              },
              {
                icon: Library,
                title: "Borrow a Book",
                text: "Browse the library and borrow any available book with one click.",
              },
              {
                icon: RotateCcw,
                title: "Return on Time",
                text: "Every borrow lasts 7 days — return it so others can enjoy it too.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm"
              >
                <f.icon className="mx-auto h-8 w-8 text-emerald-800" />
                <h3 className="mt-3 font-semibold text-stone-900">{f.title}</h3>
                <p className="mt-1 text-sm text-stone-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra section 2: Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-stone-900">
          Explore Categories
        </h2>
        <p className="mt-1 text-center text-sm text-stone-600">
          From timeless fiction to curious young minds.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {["Fiction", "Science", "History", "Kids", "Others"].map((c) => (
            <Link
              key={c}
              href="/books"
              className="rounded-xl border border-stone-200 bg-white py-6 text-center font-medium text-stone-800 shadow-sm transition hover:border-emerald-800 hover:text-emerald-800"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
