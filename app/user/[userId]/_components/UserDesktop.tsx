"use client";

import FullScreenImage from "@/components/media/FullScreenImage";
import UserAvatar from "@/components/UserAvatar";
import { useImageColors } from "@/hooks/image-colors";
import { useCallback, useState } from "react";
import type { UserProps } from "./types";
import { UserActions } from "./UserActions";
import { UserInfo } from "./UserInfo";

export const UserDesktop = ({ user, onInfoClick }: UserProps) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const backgroundGradient = useImageColors(
    user.avatar || "/default-avatar.png",
  );

  const handleImageClick = useCallback((url: string) => {
    setFullScreenImage(url);
  }, []);

  return (
    <div className='w-full'>
      <div
        className='relative h-[200px] animate-gradient-x rounded-t-lg'
        style={{
          backgroundImage: backgroundGradient,
          backgroundSize: "400% 400%",
        }}
      />
      <div className='relative px-6 py-4 bg-primary-theme text-white rounded-b-lg'>
        <div className='absolute -top-16 left-6'>
          <UserAvatar
            src={user.avatar}
            gradientBorder
            size={120}
            className='mb-4 w-32 h-32 cursor-pointer'
            onClick={() =>
              handleImageClick(user.avatar || "/default-avatar.png")
            }
          />
        </div>
        <div className='ml-40 flex justify-between items-start'>
          <UserInfo user={user} onInfoClick={onInfoClick} />
          <UserActions userId={user.id} />
        </div>
      </div>
      {fullScreenImage && (
        <div className='fixed inset-0 flex items-center justify-center z-10'>
          <FullScreenImage
            url={fullScreenImage}
            onClose={() => setFullScreenImage(null)}
          />
        </div>
      )}
    </div>
  );
};
