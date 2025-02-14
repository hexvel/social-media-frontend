"use client";

import Loader from "@/components/Loader";
import { CreatePostForm } from "@/components/posts/CreatePost";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // импортируем компоненты для модалки
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  useGetProfileUserQuery,
  useGetUserQuery,
} from "@/services/user.service";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { UserDesktop } from "./UserDesktop";
import { UserFullInfo } from "./UserFullInfo";
import { UserMobile } from "./UserMobile";
import { UserPosts } from "./UserPosts";

export const User = ({ userId }: { userId: string }) => {
  const { data: user, isLoading } = useGetUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const { data: profileUser } = useGetProfileUserQuery();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const isMobile = useMobile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (!user) return <div>User not found</div>;

  const sharedProps = {
    user: {
      ...user,
      avatar: user.avatar || "/default-avatar.png",
      bio: user.bio || undefined,
    },
    onInfoClick: () => setIsInfoOpen(true),
  };

  return (
    <div className='flex flex-col gap-5'>
      {isMobile ? (
        <UserMobile {...sharedProps} />
      ) : (
        <UserDesktop {...sharedProps} />
      )}
      {profileUser?.id === user.id && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className={cn(
                "py-5 cursor-pointer bg-primary-theme text-white flex items-center",
                isMobile && "p-2 text-xl",
              )}
              size={"lg"}
            >
              <PlusCircle className={cn(isMobile && "w-9 h-9")} />
              Create post
            </Button>
          </DialogTrigger>

          <DialogContent className='bg-primary-theme border border-secondary-theme'>
            <DialogTitle>Create post</DialogTitle>
            <CreatePostForm />
          </DialogContent>
        </Dialog>
      )}
      <UserPosts userId={userId} />
      <UserFullInfo
        user={user}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
};
