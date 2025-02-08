"use client";

import { NAVIGATION_ITEMS } from "@/constants/navbar.constant";
import { useGetProfileUserQuery } from "@/services/user.service";
import {
  Bell,
  MessageSquareTextIcon,
  PencilRulerIcon,
  Search,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: user } = useGetProfileUserQuery();

  return (
    <header className='hidden xl:flex w-full justify-between py-4 px-8 bg-primary-theme/60'>
      <div className='flex items-center gap-x-2'>
        <div className='bg-secondary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform'>
          <PencilRulerIcon size={24} color='black' />
        </div>
        <div className='flex items-center gap-x-1 p-3 bg-primary-theme rounded-md shadow-md'>
          <Search color='#6f7376' />
          <input
            type='text'
            placeholder='Search'
            className='w-[240px] bg-transparent focus:bg-transparent placeholder:text-[#6f7376] text-[#6f7376] placeholder:font-medium outline-none'
          />
        </div>
      </div>
      <nav className='flex items-center'>
        <ul className='flex items-center gap-x-4'>
          {NAVIGATION_ITEMS.map(item => (
            <li key={item.title} className=''>
              <Link
                href={item.path}
                className='text-[#6f7376] font-medium hover:text-white/50 transition-colors'
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex items-center gap-x-4'>
        <div className='bg-primary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform shadow-lg'>
          <MessageSquareTextIcon size={24} color='#6f7376' />
        </div>
        <div className='bg-primary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform shadow-lg'>
          <SettingsIcon size={24} color='#6f7376' />
        </div>
        <div className='relative bg-primary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform shadow-lg'>
          <div className='h-2 w-2 bg-red-600 rounded-full absolute top-0 right-0' />
          <Bell size={24} color='#6f7376' />
        </div>
        <Link href={`/user/${user?.id}`}>
          <Image
            src={user?.avatar || "/avatar.jpg"}
            height={48}
            width={48}
            alt='Profile photo'
            className='rounded-md shadow-lg cursor-pointer'
          />
        </Link>
      </div>
    </header>
  );
}
