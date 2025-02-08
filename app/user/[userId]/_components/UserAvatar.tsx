import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  size: "large" | "extraLarge";
}

export const UserAvatar = ({ user, size }: UserAvatarProps) => {
  const sizeClasses = size === "large" ? "h-24 w-24" : "h-32 w-32";
  const borderClasses =
    size === "large" ? "border-2 border-zinc-800" : "border-4 border-zinc-900";

  return (
    <Avatar className={`${sizeClasses} ${borderClasses} rounded-full`}>
      <AvatarImage
        src={user.avatar || "/avatar.jpg"}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <AvatarFallback>
        {user.firstName[0]}
        {user.lastName[0]}
      </AvatarFallback>
    </Avatar>
  );
};
