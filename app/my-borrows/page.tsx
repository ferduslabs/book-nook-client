import type { Metadata } from "next";
import MyBorrowsClient from "./MyBorrowsClient";

export const metadata: Metadata = {
  title: "My Borrows",
};

export default function MyBorrowsPage() {
  return <MyBorrowsClient />;
}
