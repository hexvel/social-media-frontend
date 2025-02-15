"use client";

import UserAvatar from "@/components/UserAvatar";
import type { UserProps } from "./types";
import { UserActions } from "./UserActions";
import { UserHeader } from "./UserHeader";
import { UserInfo } from "./UserInfo";

export const UserMobile = ({ user, onInfoClick }: UserProps) => (
  <div className='flex flex-col bg-primary-theme py-4'>
    <UserHeader />
    <div className='flex flex-col items-center px-4 pt-6'>
      <UserAvatar
        src={user.avatar}
        gradientBorder
        size={100}
        className='mb-4'
      />
      <UserInfo user={user} onInfoClick={onInfoClick} isMobile />
    </div>
    <UserActions isMobile userId={user.id} />
  </div>
);
