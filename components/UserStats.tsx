"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetStatsQuery } from "@/services/friends.service";
import { IUser } from "@/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UserStats() {
  const { data: fetchedStats, isLoading: isStatsLoading } = useGetStatsQuery();

  const [selectedStat, setSelectedStat] = useState<{
    label: string;
    users: IUser[];
  } | null>(null);

  const stats = [
    { value: fetchedStats?.followers || [], label: "Followers" },
    { value: fetchedStats?.following || [], label: "Following" },
    { value: fetchedStats?.friends || [], label: "Friends" },
  ];

  const handleStatClick = (label: string, users: IUser[]) => {
    setSelectedStat({
      label,
      users,
    });
  };

  const isLoading = isStatsLoading;

  return (
    <>
      <div className='hidden sm:grid grid-cols-3 gap-4 bg-primary-theme p-4 rounded-md text-white text-center'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='cursor-pointer hover:bg-primary-theme/80 p-2 rounded-md transition-colors'
            onClick={() => handleStatClick(stat.label, stat.value)}
          >
            <div className='text-lg font-medium'>{stat.value.length}</div>
            <div className='text-sm text-muted-foreground'>{stat.label}</div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedStat} onOpenChange={() => setSelectedStat(null)}>
        <DialogContent className='max-h-[80vh] animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200 bg-primary-theme border border-secondary-theme'>
          <DialogHeader>
            <DialogTitle>{selectedStat?.label}</DialogTitle>
          </DialogHeader>
          <ScrollArea className='h-[50vh] border-none p-4'>
            {isLoading ? (
              <div className='flex items-center justify-center h-full'>
                <Loader2 className='h-6 w-6 animate-spin' />
              </div>
            ) : (
              <div className='space-y-4'>
                {selectedStat?.users.length === 0 ? (
                  <div className='text-2xl font-medium text-muted-foreground text-center'>
                    No {selectedStat?.label}
                  </div>
                ) : (
                  selectedStat?.users.map((user, index) => (
                    <div
                      key={index}
                      className='flex items-center space-x-4 p-2 rounded-lg hover:bg-muted-foreground hover:text-dark transition-colors cursor-pointer'
                    >
                      <Avatar className='h-12 w-12 border-4 border-secondary-theme rounded-full'>
                        <AvatarImage
                          className='rounded-full'
                          src={user.avatar || "/default-avatar.png"}
                          alt={`${user.firstName} ${user.lastName}`}
                        />

                        <AvatarFallback className='font-medium'>
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Link href={`/user/${user.id}`}>
                        <div className='font-medium'>
                          {user.firstName} {user.lastName}
                        </div>
                        <div className='text-sm'>@{user.username}</div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
