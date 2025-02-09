"use client";

import { IPost } from "@/types/post.type";
import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeletePostDialog from "./DeletePostDialog";

interface PostsMoreButtonProps {
  post: IPost;
  className?: string;
}

export default function PostsMoreButton({
  post,
  className,
}: PostsMoreButtonProps) {
  const [showDeletePostDialog, setShowDeletePostDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`inline-flex items-center justify-center h-9 w-9 rounded-md transition-colors hover:bg-accent-theme hover:text-accent-foreground ${className}`}
          >
            <MoreHorizontalIcon className='size-5 text-muted-foreground' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-primary-foreground border-none'>
          <DropdownMenuItem
            onClick={() => setShowDeletePostDialog(true)}
            className='cursor-pointer'
          >
            <span className='flex items-center gap-3 text-destructive dark:text-white'>
              <Trash2 className='size-4' />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        post={post}
        open={showDeletePostDialog}
        onClose={() => setShowDeletePostDialog(false)}
      />
    </>
  );
}
