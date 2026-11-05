import Link from "next/link";
import { BookOpen, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-amber-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        {/* brand */}
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-800" />
            <span className="text-lg font-bold text-emerald-900">BookNook</span>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            A small online library — add books, borrow them, and return on time.
          </p>
        </div>

        {/* contact */}
        <div>
          <h4 className="text-sm font-semibold text-stone-900">Contact</h4>
          <p className="mt-2 flex items-center gap-2 text-sm text-stone-600">
            <Mail className="h-4 w-4" /> hello@booknook.com
          </p>
          <p className="mt-1 text-sm text-stone-600">Dhaka, Bangladesh</p>
        </div>

        {/* social */}
        <div>
          <h4 className="text-sm font-semibold text-stone-900">Follow Us</h4>
          <div className="mt-2 flex gap-3">
            {/* নতুন X logo */}
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-stone-700 hover:fill-emerald-800">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-stone-700 hover:fill-emerald-800">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-stone-700 hover:fill-emerald-800">
                <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.38.82 1.11.82 2.24v3.32c0 .32.21.7.82.58A12 12 0 0 0 12 .3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 py-4 text-center text-sm text-stone-600">
        © {new Date().getFullYear()} BookNook. All rights reserved. |{" "}
        <Link href="/books" className="hover:text-emerald-800">
          Browse Books
        </Link>
      </div>
    </footer>
  );
}
