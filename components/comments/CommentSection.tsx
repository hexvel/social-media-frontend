import { formatter } from "@/lib/utils";
import { useGetProfileUserQuery } from "@/services/user.service";
import type { IComment } from "@/types/comment.type";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import UserAvatar from "../UserAvatar";

interface CommentSectionProps {
  postId: number;
  comments: IComment[];
  onAddComment: (postId: number, content: string) => void;
  onRemoveComment: (commentId: number) => void;
  isCreating: boolean;
  isDeleting: boolean;
}

export default function CommentSection({
  postId,
  comments,
  onAddComment,
  onRemoveComment,
  isCreating,
  isDeleting,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const { data: currentUser } = useGetProfileUserQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(postId, newComment);
    setNewComment("");
  };
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        transition: {
          height: {
            duration: 0.3,
            ease: "easeOut",
          },
          opacity: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
      }}
      exit={{
        opacity: 0,
        height: 0,
        transition: {
          height: {
            duration: 0.3,
            ease: "easeIn",
          },
          opacity: {
            duration: 0.2,
            ease: "easeIn",
          },
        },
      }}
      className='w-full space-y-4 mt-2 border-t pt-4 overflow-hidden'
    >
      <motion.form
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.1,
            duration: 0.2,
            ease: "easeOut",
          },
        }}
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-2'
      >
        <Textarea
          placeholder='Write a comment...'
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className='min-h-[80px] resize-none focus-visible:outline-none focus-visible:ring-0'
        />
        <Button
          type='submit'
          disabled={isCreating || !newComment.trim()}
          className='self-end text-white bg-dark/30 cursor-pointer hover:bg-primary-theme/50 transition-colors'
        >
          {isCreating ? "Sending..." : "Send"}
        </Button>
      </motion.form>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.15,
            duration: 0.2,
            ease: "easeOut",
          },
        }}
        className='space-y-4 max-h-[400px] overflow-y-auto'
      >
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ x: -10, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.05 * index,
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            exit={{
              x: -10,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            }}
            className='flex gap-x-3 p-3 rounded-lg border hover:bg-dark/10 transition-colors duration-300'
          >
            <UserAvatar
              gradientBorder={comment.author.isVerified}
              src={comment.author.avatar}
              size={40}
            />
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-x-2'>
                  <span className='font-medium'>
                    {comment.author.firstName} {comment.author.lastName}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {formatter
                      .format(new Date(comment.createdAt))
                      .replace(",", "")}
                  </span>
                </div>
                {currentUser?.id === comment.author.id && (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-gray-500 hover:text-red-500 hover:bg-red-500/50 rounded-full transition-colors duration-300 cursor-pointer'
                    onClick={() => onRemoveComment(comment.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>
              <p className='mt-1 text-sm'>{comment.content}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
