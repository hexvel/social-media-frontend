"use client";

import UserAvatar from "@/components/UserAvatar";
import { useComments } from "@/hooks/use-comments";
import { useLikes } from "@/hooks/use-likes";
import { formatter } from "@/lib/utils";
import { useGetProfileUserQuery } from "@/services/user.service";
import type { IPost } from "@/types/post.type";
import { AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, VerifiedIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import AnimatedIcon from "../animations/AnimatedIcon";
import CommentSection from "../comments/CommentSection";
import FullScreenImage from "../media/FullScreenImage";
import { MediaPreviews } from "../media/MediaPreview";
import PostMoreButton from "./PostMoreButton";

export default function Post({
  id,
  content,
  photos,
  createdAt,
  author,
}: IPost) {
  const { likes, isLiked, handleAddLike, handleRemoveLike, isLoading } =
    useLikes(id);
  const {
    comments,
    handleAddComment,
    handleRemoveComment,
    isCreatingComment,
    isDeletingComment,
  } = useComments(id);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const router = useRouter();
  const { data: profileUser } = useGetProfileUserQuery();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleImageClick = useCallback((url: string) => {
    setFullScreenImage(url);
  }, []);

  const formattedDate = useMemo(
    () => formatter.format(new Date(createdAt)).replace(",", ""),
    [createdAt],
  );

  const handlePostClick = useCallback(() => {
    router.push(`/posts/${id}`);
  }, [router, id]);

  return (
    <div className='w-full space-y-3 flex flex-col p-4 bg-primary-theme rounded-md shadow-md transition-all hover:shadow-lg'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-x-3'>
          <UserAvatar size={60} gradientBorder src={author.avatar} />

          <div className='flex flex-col'>
            <div className='flex items-center gap-x-2'>
              <Link
                href={`/user/${author.id}`}
                className='flex items-center gap-x-2 hover:underline font-medium'
              >
                {author.firstName} {author.lastName}
              </Link>
              {author.isVerified && (
                <VerifiedIcon size={20} className='fill-sky-600' />
              )}
            </div>
            <span
              className='text-sm text-gray-500 cursor-pointer hover:underline'
              onClick={handlePostClick}
            >
              {formattedDate}
            </span>
          </div>
        </div>
        {profileUser?.id === author.id && (
          <PostMoreButton
            post={{ id, content, createdAt, author }}
            className='text-gray-500 hover:text-white hover:bg-dark/20 rounded-full transition-colors duration-300 cursor-pointer'
          />
        )}
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
          <AnimatedIcon
            icon={<Heart size={24} />}
            count={likes}
            onClick={isLiked ? handleRemoveLike : handleAddLike}
            isActive={isLiked}
            disabled={isLoading}
          />
          <AnimatedIcon
            icon={<MessageSquare size={24} />}
            count={comments.length}
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          />
        </div>
        <AnimatedIcon
          icon={<Share2 size={24} />}
          count={0}
          onClick={() => {}}
          isShare={true}
        />
      </div>

      <AnimatePresence>
        {isCommentsOpen && (
          <CommentSection
            postId={id}
            comments={comments}
            onAddComment={handleAddComment}
            onRemoveComment={handleRemoveComment}
            isCreating={isCreatingComment}
            isDeleting={isDeletingComment}
          />
        )}
      </AnimatePresence>

      {fullScreenImage && (
        <div className='fixed inset-0 flex items-center justify-center z-10'>
          <FullScreenImage
            url={fullScreenImage}
            onClose={() => setFullScreenImage(null)}
          />
        </div>
      )}
    </div>
  );
}
