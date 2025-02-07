"use client";

import { selectUser } from "@/features/users/userSlice";
import { BadgeCheckIcon } from "lucide-react";
import { useSelector } from "react-redux";
import SidebarNavItems from "./SidebarNavItems";
import UserAvatar from "./UserAvatar";
import UserFollowers from "./UserFollowers";

export default function Sidebar({ className }: { className: string }) {
  const user = useSelector(selectUser);

  return (
    <div className={className}>
      <div className='hidden sm:flex rounded-md flex-col items-center w-72'>
        <UserAvatar size={130} gradientBorder />
        <span className='text-2xl flex items-center gap-x-2'>
          {user?.firstName} {user?.lastName}{" "}
          <BadgeCheckIcon size={24} className='fill-sky-600' />
        </span>
        <span className='text-muted-foreground'>@{user?.username}</span>
      </div>
      <UserFollowers />
      <SidebarNavItems className={className} />
    </div>
  );
}
