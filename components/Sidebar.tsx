"use client";

import { useGetProfileUserQuery } from "@/services/user.service";
import { BadgeCheckIcon } from "lucide-react";
import SidebarNavItems from "./SidebarNavItems";
import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";

export default function Sidebar({ className }: { className: string }) {
  const { data: user } = useGetProfileUserQuery();

  return (
    <div className={className}>
      <div className='hidden sm:flex rounded-md flex-col items-center w-72'>
        <UserAvatar size={130} gradientBorder src={user?.avatar} />
        <span className='text-2xl flex items-center gap-x-2'>
          {user?.firstName} {user?.lastName}{" "}
          {user?.isVerified && (
            <BadgeCheckIcon size={24} className='fill-sky-600' />
          )}
        </span>
        <span className='text-muted-foreground'>@{user?.username}</span>
      </div>
      <UserStats />
      <SidebarNavItems className={className} />
    </div>
  );
}
