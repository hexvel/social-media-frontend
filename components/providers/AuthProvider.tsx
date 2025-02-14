"use client";

import { setProfileUser } from "@/features/users/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FullscreenLoader from "../FullscreenLoader";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/user/me", {
          credentials: "include",
        });

        if (!response.ok) {
          dispatch(setProfileUser(null));
          router.push("/auth/login");
          return;
        }

        const userData = await response.json();
        dispatch(setProfileUser(userData));
      } catch (error) {
        dispatch(setProfileUser(null));
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, router]);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return <>{children}</>;
}
