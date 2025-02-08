"use client";

import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserHeader = () => {
  const router = useRouter();

  return (
    <div className='flex justify-between items-center px-4 bg-zinc-900'>
      <button className='text-white' onClick={() => router.back()}>
        <ArrowLeft className='h-6 w-6' />
      </button>
      <div className='flex gap-2'>
        <button className='text-white' onClick={() => router.back()}>
          <MoreHorizontal className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
};
