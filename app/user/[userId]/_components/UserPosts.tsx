"use client";

import Post from "@/components/posts/Post";
import { useGetPostsQuery } from "@/services/post.service";
import { Loader2 } from "lucide-react";

export const UserPosts = ({ userId }: { userId: string }) => {
  const { data: posts, isLoading } = useGetPostsQuery({ owner: userId });

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='animate-spin text-primary-theme' />
      </div>
    );

  console.log(posts);

  return (
    <div className='flex flex-col gap-4'>
      {posts?.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <h2 className='text-2xl text-gray-500'>Posts not found</h2>
        </div>
      )}
      {posts?.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
