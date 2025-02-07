"use client";

import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFriendsQuery,
} from "@/services/friends.service";

export default function UserFollowers() {
  const { data: followers = [] } = useGetFollowersQuery();
  const { data: following = [] } = useGetFollowingQuery();
  const { data: friends = [] } = useGetFriendsQuery();

  const stats = [
    { value: followers, label: "Followers" },
    { value: following, label: "Following" },
    { value: friends, label: "Friends" },
  ];

  return (
    <div className='hidden sm:grid grid-cols-3 gap-4 bg-primary-theme p-4 rounded-md text-white text-center'>
      {stats.map((stat, index) => (
        <div key={index}>
          <div className='text-lg font-medium'>
            {stat.label === "Followers" && (
              <div className='text-sm text-muted-foreground'>
                {stat.value.length}
              </div>
            )}
            {stat.label === "Following" && (
              <div className='text-sm text-muted-foreground'>
                {stat.value.length}
              </div>
            )}
            {stat.label === "Friends" && (
              <div className='text-sm text-muted-foreground'>
                {stat.value.length}
              </div>
            )}
          </div>
          <div className='text-sm text-muted-foreground'>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
