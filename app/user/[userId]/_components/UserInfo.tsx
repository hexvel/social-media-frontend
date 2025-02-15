import { cn, truncateText } from "@/lib/utils";
import { IUser } from "@/types/user.type";
import { Info, VerifiedIcon } from "lucide-react";

interface UserInfoProps {
  user: IUser;
  onInfoClick: () => void;
  isMobile?: boolean;
}

export const UserInfo = ({
  user,
  onInfoClick,
  isMobile = false,
}: UserInfoProps) => (
  <div
    className={
      isMobile
        ? "mt-4 text-center flex flex-col items-center gap-3"
        : "space-y-2"
    }
  >
    <div
      className={cn(
        isMobile ? "flex items-center justify-center gap-2" : "",
        user.isVerified && "flex items-center gap-2",
      )}
    >
      <h2
        className={`${
          isMobile ? "text-xl" : "text-2xl"
        } font-semibold text-white`}
      >
        {user.firstName} {user.lastName}
      </h2>
      <span>
        {user.isVerified && <VerifiedIcon size={20} className='fill-sky-600' />}
      </span>
    </div>
    {user.bio && (
      <p className={`${isMobile ? "mt-2 text-sm" : ""} text-zinc-400`}>
        {truncateText(user.bio, 100)}
      </p>
    )}
    <div className='flex items-center gap-1 text-sm text-zinc-400'>
      <Info className='h-4 w-4' />
      <button
        className={`${
          isMobile ? "hover:text-white" : "cursor-pointer hover:underline"
        }`}
        onClick={onInfoClick}
      >
        More info
      </button>
    </div>
  </div>
);
