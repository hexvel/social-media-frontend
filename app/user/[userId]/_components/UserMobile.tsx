"use client";

import type { UserProps } from "./types";
import { UserActions } from "./UserActions";
import { UserAvatar } from "./UserAvatar";
import { UserHeader } from "./UserHeader";
import { UserInfo } from "./UserInfo";

export const UserMobile = ({ user, onInfoClick }: UserProps) => (
  <div className='flex flex-col bg-zinc-900 py-4'>
    <UserHeader />
    <div className='flex flex-col items-center px-4 pt-6'>
      <UserAvatar user={user} size='large' />
      <UserInfo user={user} onInfoClick={onInfoClick} isMobile />
    </div>
    <UserActions isMobile />
  </div>
);
