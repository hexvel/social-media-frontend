"use client";

import { Button } from "@/components/ui/button";
import {
  useAddFriendMutation,
  useDeleteFriendMutation,
  useGetStatsQuery,
} from "@/services/friends.service";
import { useGetProfileUserQuery } from "@/services/user.service";
import { MoreHorizontal, UserMinus, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

interface UserActionsProps {
  isMobile?: boolean;
  userId: number;
}

export const UserActions = ({ isMobile = false, userId }: UserActionsProps) => {
  const { data: stats } = useGetStatsQuery();
  const { data: profileUser } = useGetProfileUserQuery();
  const { followers, following, friends } = stats || {};

  const [addFriend, { isLoading }] = useAddFriendMutation();
  const [removeFriend, { isLoading: isRemovingFriend }] =
    useDeleteFriendMutation();

  const handleRemoveFriend = async () => {
    await removeFriend({ user_id: userId });
    toast.success("Friend removed");
  };

  const handleAddFriend = async () => {
    await addFriend({ user_id: userId });
    toast.success("Friend request sent");
  };

  if (isMobile) {
    return (
      <div className='p-2 mt-4'>
        <button className='w-full py-3 bg-dark/20 text-white rounded-lg'>
          Message
        </button>
      </div>
    );
  }

  const isFriend = friends?.some(({ id }) => id === userId);

  return (
    <div className='flex gap-2'>
      {userId !== profileUser?.id && (
        <Button variant='secondary' className='cursor-pointer text-sm'>
          Message
        </Button>
      )}

      {isFriend && (
        <Button
          variant='secondary'
          className='cursor-pointer'
          onClick={handleRemoveFriend}
          disabled={isRemovingFriend}
        >
          <UserMinus className='h-4 w-4' />
          Unfollow
        </Button>
      )}
      {!isFriend && userId !== profileUser?.id && (
        <Button
          variant='secondary'
          className='cursor-pointer'
          onClick={handleAddFriend}
          disabled={isLoading}
        >
          <UserPlus className='h-4 w-4' />
          {isLoading ? "Adding..." : "Add to friends"}
        </Button>
      )}

      <MoreHorizontal className='h-4 w-4 cursor-pointer' />
    </div>
  );
};
