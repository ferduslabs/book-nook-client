import type { Metadata } from "next";
import BookDetailsClient from "./BookDetailsClient";

export const metadata: Metadata = {
  title: "Book Details",
};

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BookDetailsClient id={id} />;
}
