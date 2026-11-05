import type { Metadata } from "next";
import BooksClient from "./BooksClient";

export const metadata: Metadata = {
  title: "All Books",
};

export default function BooksPage() {
  return <BooksClient />;
}
