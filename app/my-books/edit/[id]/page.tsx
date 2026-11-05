import type { Metadata } from "next";
import EditBookClient from "./EditBookClient";

export const metadata: Metadata = {
  title: "Edit Book",
};

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditBookClient id={id} />;
}
