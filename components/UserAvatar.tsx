import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  avatarUrl?: string | null | undefined;
  size?: number;
  className?: string;
  gradientBorder?: boolean;
  src?: string | undefined;
}

export default function UserAvatar({
  className,
  size = 48,
  gradientBorder,
  src,
}: UserAvatarProps) {
  const imageSize = size - 8;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {gradientBorder ? (
        <div className='relative mb-2' style={{ height: size, width: size }}>
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 p-[2px]'>
            <div className='rounded-full bg-black p-1'>
              <Image
                src={src || "/avatar.jpg"}
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
          src={src || "/avatar.jpg"}
          alt='Profile Pic'
          width={imageSize}
          height={imageSize}
          className='rounded-full object-cover mb-2 select-none'
        />
      )}
    </div>
  );
}
