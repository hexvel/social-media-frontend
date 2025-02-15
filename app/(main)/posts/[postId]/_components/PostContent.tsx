"use client";

import Loader from "@/components/Loader";
import Post from "@/components/posts/Post";
import { useGetPostByIdQuery } from "@/services/post.service";

export const PostContent = ({ postId }: { postId: string }) => {
  const { data, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) return <Loader />;
  if (!data) return <div>No posts found</div>;

  console.log(data);

  return (
    <div className='w-full flex flex-col gap-y-4'>
      <Post key={data.id} {...data} createdAt={new Date(data.createdAt)} />
    </div>
  );
};
