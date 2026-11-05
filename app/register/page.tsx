import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterClient />
    </Suspense>
  );
}
