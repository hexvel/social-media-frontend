"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { SearchCombobox } from "@/components/ui/SearchCombobox";
import UserAvatar from "@/components/UserAvatar";
import { useGetFriendsQuery } from "@/services/friends.service";
import Link from "next/link";
import { useState } from "react";

export default function FriendsPage() {
  const { data: friends, isLoading } = useGetFriendsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends?.filter(
    friend =>
      friend.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
    <div className='w-full px-4 space-y-5'>
      <div className='flex flex-col md:flex-row gap-4 items-center bg-primary-theme rounded-lg shadow-sm p-4'>
        <h1 className='text-2xl md:text-3xl font-bold'>Friends</h1>
        <div className='ml-auto w-full md:w-64'>
          <SearchCombobox
            data={filteredFriends || []}
            onSearch={setSearchQuery}
            value={searchQuery}
            placeholder='Search friends...'
            renderItem={friend => (
              <Link href={`/user/${friend.id}`}>
                <div className='flex items-center space-x-3'>
                  <UserAvatar
                    src={friend.avatar || "/default-avatar.png"}
                    gradientBorder={friend.isVerified}
                    size={32}
                  />
                  <div>
                    <p className='font-medium'>
                      {friend.firstName} {friend.lastName}
                    </p>
                    <p className='text-sm text-gray-400'>@{friend.username}</p>
                  </div>
                </div>
              </Link>
            )}
          />
        </div>
      </div>
      <div className='space-y-4'>
        {friends.map(friend => (
          <div
            key={friend.id}
            className='flex flex-col gap-4 md:flex-row items-center justify-between bg-primary-theme rounded-lg shadow-sm p-4 hover:bg-primary-theme/80 transition-colors'
          >
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <UserAvatar
                  src={friend.avatar || "/default-avatar.png"}
                  gradientBorder={friend.isVerified}
                  size={48}
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
                <p className='text-lg md:text-sm text-gray-500'>
                  @{friend.username}
                </p>
                {/* TODO: Добавить статус онлайн/офлайн */}
                {/* <p className='text-sm text-gray-500'>{friend.lastSeen}</p> */}
              </div>
            </div>

            <div className='w-full md:w-auto flex flex-col md:flex-row gap-2'>
              <Button
                variant='outline'
                className='w-full md:w-auto bg-dark/20 px-3 py-1.5 text-white text-sm rounded transition-colors cursor-pointer'
              >
                Message
              </Button>
              <Link href={`/user/${friend.id}`}>
                <Button
                  variant='outline'
                  className='w-full md:w-auto bg-dark/20 px-3 py-1.5 text-white text-sm rounded transition-colors hover:bg-violet-950 cursor-pointer'
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
