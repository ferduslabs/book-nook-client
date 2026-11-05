import type { Metadata } from "next";
import AddBookClient from "./AddBookClient";

export const metadata: Metadata = {
  title: "Add Book",
};

export default function AddBookPage() {
  return <AddBookClient />;
}
