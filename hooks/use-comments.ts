import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/services/comment.service";
import { IComment } from "@/types/comment.type";
import { useCallback, useEffect, useState } from "react";

export function useComments(post_id: number) {
  const [comments, setComments] = useState<IComment[]>([]);

  const { data: commentsData, refetch } = useGetCommentsQuery({ post_id });
  const [createComment, { isLoading: isCreatingComment }] =
    useCreateCommentMutation();
  const [deleteComment, { isLoading: isDeletingComment }] =
    useDeleteCommentMutation();

  useEffect(() => {
    setComments(commentsData || []);
  }, [commentsData]);

  const handleAddComment = useCallback(
    (postId: number, content: string) => {
      createComment({ post_id: postId, content })
        .unwrap()
        .catch(() => {
          refetch();
        });
    },
    [createComment],
  );

  const handleRemoveComment = useCallback(
    (id: number) => {
      deleteComment({ id })
        .unwrap()
        .catch(() => {
          refetch();
        });
    },
    [deleteComment],
  );

  return {
    comments,
    handleAddComment,
    handleRemoveComment,
    isCreatingComment,
    isDeletingComment,
  };
}
