"use client";

import { avatarUrl } from "@/components/Header";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useImageColors } from "@/hooks/image-colors";
import { useGetUserQuery } from "@/services/user.service";
import { Info, MoreHorizontal } from "lucide-react";

export const User = ({ userId }: { userId: string }) => {
  const { data: user, isLoading } = useGetUserQuery(userId);
  const backgroundGradient = useImageColors(user?.avatar || avatarUrl);

  if (isLoading) return <Loader />;

  if (!user) return <div>User not found</div>;

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
          <Avatar className='h-32 w-32 border-4 border-zinc-900'>
            <AvatarImage
              src={user.avatar || avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback className='font-medium'>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className='ml-40 flex justify-between items-start'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold'>
              {user.firstName} {user.lastName}
            </h2>
            {user.bio && <p className='text-zinc-400'>{user.bio}</p>}
            <div className='flex items-center gap-1 text-sm text-zinc-400'>
              <Info className='h-4 w-4' />
              <button className='cursor-pointer hover:underline'>
                Подробнее
              </button>
            </div>
          </div>

          <div className='flex gap-2'>
            <Button variant='secondary' className='cursor-pointer text-sm'>
              Сообщение
            </Button>
            <Button variant='secondary' size='icon' className='cursor-pointer'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
