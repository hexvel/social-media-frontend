"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return null;
}
