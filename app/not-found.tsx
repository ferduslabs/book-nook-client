import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-emerald-800">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-stone-900">
        Page Not Found
      </h1>
      <p className="mt-2 text-stone-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-900"
      >
        Back to Home
      </Link>
    </div>
  );
}
