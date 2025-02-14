import { useImageColors } from "@/hooks/image-colors";
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
  const backgroundGradient = useImageColors(src || "/default-avatar.png");

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {gradientBorder ? (
        <div className='relative mb-2' style={{ height: size, width: size }}>
          <div
            className='absolute inset-0 rounded-full animate-gradient-x p-[2px]'
            style={{
              background: backgroundGradient,
            }}
          >
            <div className='rounded-full bg-black p-1'>
              <Image
                src={src || "/default-avatar.png"}
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
          src={src || "/default-avatar.png"}
          alt='Profile Pic'
          width={imageSize}
          height={imageSize}
          className='rounded-full object-cover mb-2 select-none'
        />
      )}
    </div>
  );
}
