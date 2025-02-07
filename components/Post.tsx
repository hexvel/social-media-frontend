"use client";

import UserAvatar from "@/components/UserAvatar";
import { useLikes } from "@/hooks/use-likes";
import { formatter } from "@/lib/utils";
import type { IPost } from "@/types/post.type";
import {
  BadgeCheckIcon,
  Heart,
  MessageSquare,
  MoreHorizontalIcon,
  SendToBackIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import FullScreenImage from "./media/FullScreenImage";
import { MediaPreviews } from "./media/MediaPreview";

export default function Post({
  id,
  content,
  photos,
  createdAt,
  author,
}: IPost) {
  const { likes, isLiked, handleAddLike, handleRemoveLike } = useLikes(id);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageClick = useCallback((url: string) => {
    setFullScreenImage(url);
  }, []);

  const formattedDate = useMemo(
    () => formatter.format(new Date(createdAt)),
    [createdAt],
  );

  const handlePostClick = useCallback(() => {
    router.push(`/posts/${author.id}`);
  }, [router, author.id]);

  return (
    <div className='w-full space-y-3 flex flex-col p-4 bg-primary-theme rounded-md'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-x-3'>
          <UserAvatar size={60} gradientBorder />

          <div className='flex flex-col'>
            <div className='flex items-center gap-x-2'>
              <Link
                href={`/user/${author.id}`}
                className='flex items-center gap-x-2 hover:underline'
              >
                {author.firstName} {author.lastName}
              </Link>
              <BadgeCheckIcon size={20} className='fill-sky-600' />
            </div>
            <span
              className='text-sm text-muted-foreground cursor-pointer hover:underline'
              onClick={handlePostClick}
            >
              {formattedDate}
            </span>
          </div>
        </div>
        <div className='p-2 hover:bg-dark cursor-pointer rounded-full transition-colors'>
          <MoreHorizontalIcon className='text-muted-foreground' />
        </div>
      </div>
      {!!photos?.length && (
        <MediaPreviews
          attachments={photos}
          onClick={() => {}}
          onImageClick={handleImageClick}
        />
      )}
      <p>{content}</p>
      <div className='mt-4 w-full flex items-center justify-between'>
        <div className='flex items-center gap-x-6'>
          <div
            className='flex items-center gap-x-2 cursor-pointer select-none'
            onClick={isLiked ? handleRemoveLike : handleAddLike}
          >
            <Heart
              color={isLiked ? "red" : "#6f7376"}
              fill={isLiked ? "red" : "transparent"}
            />
            <span className='text-[#6f7376]'>{likes}</span>
          </div>
          <div className='flex items-center gap-x-2 cursor-pointer'>
            <MessageSquare color='#6f7376' />
            <span className='text-[#6f7376]'>1k</span>
          </div>
        </div>
        <SendToBackIcon color='#6f7376' className='cursor-pointer' />
      </div>
      {fullScreenImage && (
        <FullScreenImage
          url={fullScreenImage}
          onClose={() => setFullScreenImage(null)}
        />
      )}
    </div>
  );
}
