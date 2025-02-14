"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useGetFriendsQuery } from "@/services/friends.service";
import Image from "next/image";
import Link from "next/link";

export default function FriendsPage() {
  const { data: friends, isLoading } = useGetFriendsQuery();

  if (isLoading || !friends) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <h1 className='text-2xl md:text-4xl font-medium'>No friends found</h1>
    );
  }

  return (
    <div className='w-full px-4'>
      <h1 className='text-3xl font-bold mb-8'>Friends</h1>
      <div className='space-y-4'>
        {friends.map(friend => (
          <div
            key={friend.id}
            className='flex items-center justify-between bg-primary-theme rounded-lg shadow-sm p-4 hover:bg-primary-theme/80 transition-colors'
          >
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <Image
                  src={friend.avatar || "/default-avatar.png"}
                  alt={friend.username || ""}
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
                {/*
                TODO: Добавить статус онлайн/офлайн
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    friend.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span> */}
              </div>

              <div>
                <h2 className='font-semibold'>
                  {friend.firstName} {friend.lastName}
                </h2>
                <p className='text-sm text-gray-500'>@{friend.username}</p>
                {/* TODO: Добавить статус онлайн/офлайн */}
                {/* <p className='text-sm text-gray-500'>{friend.lastSeen}</p> */}
              </div>
            </div>

            <div className='flex space-x-2'>
              <Button
                variant='outline'
                className='bg-dark/20 px-3 py-1.5 text-white text-sm rounded transition-colors cursor-pointer'
              >
                Message
              </Button>
              <Link href={`/user/${friend.id}`}>
                <Button
                  variant='outline'
                  className='bg-dark/20 px-3 py-1.5 text-white text-sm rounded transition-colors hover:bg-violet-950 cursor-pointer'
                >
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
