import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./LoginClient";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginClient />
    </Suspense>
  );
}
