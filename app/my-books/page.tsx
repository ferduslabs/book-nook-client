import type { Metadata } from "next";
import MyBooksClient from "./MyBooksClient";

export const metadata: Metadata = {
  title: "My Books",
};

export default function MyBooksPage() {
  return <MyBooksClient />;
}
