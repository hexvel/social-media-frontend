import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  size?: number;
  className?: string;
  gradientBorder?: boolean;
  src?: string;
  onClick?: () => void;
}

export default function UserAvatar({
  className,
  size = 48,
  gradientBorder,
  src,
  onClick,
}: UserAvatarProps) {
  const imageSize = size - 8;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {gradientBorder ? (
        <div className='relative mb-2' style={{ height: size, width: size }}>
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_15px_rgba(168,85,247,0.3)]'>
            <div className='rounded-full bg-black p-1'>
              <Image
                src={src || "/default-avatar.png"}
                alt='Profile Pic'
                width={imageSize}
                height={imageSize}
                className='rounded-full object-cover select-none'
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={src || "/default-avatar.png"}
          alt='Profile Pic'
          width={imageSize}
          height={imageSize}
          className='rounded-full object-cover mb-2 select-none'
          onClick={onClick}
        />
      )}
    </div>
  );
}
