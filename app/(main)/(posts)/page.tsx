"use client";

import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostSkeleton";
import { Button } from "@/components/ui/button";
import { useGetRecommendationPostsQuery } from "@/services/recommendation.service";
import { useGetProfileUserQuery } from "@/services/user.service";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: posts, isLoading } = useGetRecommendationPostsQuery();
  const { data: profileUser } = useGetProfileUserQuery();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className='w-full'>
        <PostsLoadingSkeleton />
      </div>
    );
  }

  if (!posts) return <div>No posts</div>;

  return (
    <main className='flex w-full min-w-0 gap-5'>
      <div className='flex flex-col items-start w-full min-w-0 space-y-5'>
        {posts?.length === 0 && (
          <div className='flex flex-col items-center justify-between w-full space-y-5'>
            <h2 className='text-2xl text-gray-500'>Posts not found</h2>
            <Button
              onClick={() => router.push(`/user/${profileUser?.id}`)}
              className='text-lg md:text-xl bg-primary-theme cursor-pointer w-full text-white py-6'
            >
              <PlusCircle className='size-4' />
              Create Post
            </Button>
          </div>
        )}

        {posts?.map(({ post }, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </main>
  );
}
