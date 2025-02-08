"use client";

import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostSkeleton";
import { useGetRecommendationPostsQuery } from "@/services/recommendation.service";

export default function HomePage() {
  const { data: posts, isLoading } = useGetRecommendationPostsQuery();

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
      <div className='flex flex-col items-center w-full min-w-0 space-y-5'>
        {posts?.map(({ post }, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </main>
  );
}
