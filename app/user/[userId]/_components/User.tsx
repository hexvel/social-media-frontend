"use client";

import FullscreenLoader from "@/components/FullscreenLoader";
import { useGetUserQuery } from "@/services/user.service";
import { useEffect, useState } from "react";
import { UserDesktop } from "./UserDesktop";
import { UserFullInfo } from "./UserFullInfo";
import { UserMobile } from "./UserMobile";

export const User = ({ userId }: { userId: string }) => {
  const { data: user, isLoading } = useGetUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (isLoading) return <FullscreenLoader />;
  if (!user) return <div>User not found</div>;

  const sharedProps = {
    user: {
      ...user,
      avatar: user.avatar || undefined,
      bio: user.bio || undefined,
    },
    onInfoClick: () => setIsInfoOpen(true),
  };

  return (
    <>
      {isMobile ? (
        <UserMobile {...sharedProps} />
      ) : (
        <UserDesktop {...sharedProps} />
      )}
      <UserFullInfo
        user={user}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </>
  );
};
