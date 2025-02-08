"use client";

import { cn } from "@/lib/utils";
import { useGetProfileUserQuery } from "@/services/user.service";
import Image from "next/image";

interface UserAvatarProps {
  avatarUrl?: string | null | undefined;
  size?: number;
  className?: string;
  gradientBorder?: boolean;
}

export default function UserAvatar({
  className,
  size = 48,
  gradientBorder,
}: UserAvatarProps) {
  const imageSize = size - 8;
  const { data: user } = useGetProfileUserQuery();

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {gradientBorder ? (
        <div className='relative mb-2' style={{ height: size, width: size }}>
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 p-[2px]'>
            <div className='rounded-full bg-black p-1'>
              <Image
                src={user?.avatar || "/avatar.jpg"}
                alt='Profile Pic'
                width={imageSize}
                height={imageSize}
                className='rounded-full object-cover select-none'
              />
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={user?.avatar || "/avatar.jpg"}
          alt='Profile Pic'
          width={imageSize}
          height={imageSize}
          className='rounded-full object-cover mb-2 select-none'
        />
      )}
    </div>
  );
}
