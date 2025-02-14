import { useImageColors } from "@/hooks/image-colors";
import type { UserProps } from "./types";
import { UserActions } from "./UserActions";
import { UserAvatar } from "./UserAvatar";
import { UserInfo } from "./UserInfo";

export const UserDesktop = ({ user, onInfoClick }: UserProps) => {
  const backgroundGradient = useImageColors(
    user.avatar || "/default-avatar.png",
  );

  return (
    <div className='w-full'>
      <div
        className='relative h-[200px] transition-all duration-1000 ease-in-out animate-gradient-x rounded-t-lg'
        style={{
          backgroundImage: backgroundGradient,
          backgroundSize: "400% 400%",
        }}
      />
      <div className='relative px-6 py-4 bg-primary-theme text-white rounded-b-lg'>
        <div className='absolute -top-16 left-6'>
          <UserAvatar user={user} size='extraLarge' />
        </div>
        <div className='ml-40 flex justify-between items-start'>
          <UserInfo user={user} onInfoClick={onInfoClick} />
          <UserActions userId={user.id} />
        </div>
      </div>
    </div>
  );
};
