import { truncateText } from "@/lib/utils";
import {
  useAddFriendMutation,
  useGetFollowersQuery,
} from "@/services/friends.service";
import { Loader2 } from "lucide-react";
import UserAvatar from "./UserAvatar";

export default function FollowUsers() {
  const { data: followUsers, isLoading } = useGetFollowersQuery();
  const [addFriend, { isLoading: isAddingFriend }] = useAddFriendMutation();

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-full'>
        <Loader2 className='size-6 animate-spin duration-300' />
      </div>
    );

  return (
    <div className='bg-primary-theme hidden p-4 w-72 flex-none xl:block lg:w-80 rounded-md'>
      <div className='text-xl font-bold mb-4'>Who to follow</div>
      <div className='flex flex-col gap-4'>
        {followUsers?.length === 0 ? (
          <div className='flex justify-center items-center h-full'>
            <p className='text-muted-foreground'>No followers found</p>
          </div>
        ) : (
          <>
            {followUsers?.map(user => (
              <div key={user.id} className='flex justify-between'>
                <div className='flex justify-center gap-x-3'>
                  <UserAvatar
                    size={60}
                    src={user.avatar}
                    className='flex-none'
                    gradientBorder={user.isVerified}
                  />
                  <div>
                    <p className='line-clamp-1 flex items-center gap-x-2 break-all font-medium cursor-default'>
                      {truncateText(`${user.firstName} ${user.lastName}`, 12)}
                    </p>
                    <p className='line-clamp-1 break-all text-muted-foreground cursor-default'>
                      {truncateText(`@${user.username}`, 12)}
                    </p>
                  </div>
                </div>
                <button
                  className='h-10 px-4 border border-secondary-theme text-secondary-theme border-double rounded-3xl font-medium hover:bg-secondary-theme hover:text-dark transition-colors select-none cursor-pointer'
                  onClick={() => addFriend({ user_id: user.id })}
                >
                  {isAddingFriend ? (
                    <Loader2 className='size-4 animate-spin' />
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            ))}
            {followUsers && followUsers.length > 5 && (
              <span className='text-center text-secondary-theme cursor-pointer'>
                View More
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
