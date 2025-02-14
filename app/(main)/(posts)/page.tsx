"use client";

import { CreatePostForm } from "@/components/posts/CreatePost";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostSkeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useGetRecommendationPostsQuery } from "@/services/recommendation.service";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { data: posts, isLoading } = useGetRecommendationPostsQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useMobile();

  if (isLoading) {
    return (
      <div className='w-full'>
        <PostsLoadingSkeleton />
      </div>
    );
  }

  return (
    <main className='flex w-full min-w-0 gap-5'>
      <div className='flex flex-col items-start w-full min-w-0 space-y-5'>
        {posts?.length === 0 && (
          <div className='flex flex-col items-center justify-between w-full space-y-5'>
            <h2 className='text-2xl text-gray-500'>Posts not found</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className='flex items-center justify-center gap-x-2 cursor-pointer bg-primary-theme text-white py-6 px-4 rounded-md w-full text-lg md:text-xl'>
                  <PlusCircle className={cn(isMobile && "w-9 h-9")} />
                  Create post
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-primary-theme border border-secondary-theme'>
                <DialogTitle>Create post</DialogTitle>
                <CreatePostForm />
              </DialogContent>
            </Dialog>
          </div>
        )}

        {posts?.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </main>
  );
}
