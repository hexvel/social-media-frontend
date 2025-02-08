"use client";

import FullscreenLoader from "@/components/FullscreenLoader";
import { CreatePostForm } from "@/components/posts/CreatePost";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // импортируем компоненты для модалки
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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // состояние для открытия модалки

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
      <div className='flex flex-col gap-5'>
        {isMobile ? (
          <UserMobile {...sharedProps} />
        ) : (
          <UserDesktop {...sharedProps} />
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className='py-5 cursor-pointer' size={"lg"}>
              Create post
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-primary-theme border border-secondary-theme'>
            <DialogTitle>Create post</DialogTitle>
            <CreatePostForm />
          </DialogContent>
        </Dialog>
      </div>

      <UserFullInfo
        user={user}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </>
  );
};
