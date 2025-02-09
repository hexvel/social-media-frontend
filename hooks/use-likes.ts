"use client";

import {
  useAddLikeMutation,
  useGetLikesQuery,
  useRemoveLikeMutation,
} from "@/services/likes.service";
import { useCallback, useEffect, useState } from "react";

export function useLikes(post_id: number) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const {
    data: likesData,
    refetch,
    isLoading,
  } = useGetLikesQuery({ post_id }, { skip: !post_id });

  const [addLike, { isLoading: isAddingLike }] = useAddLikeMutation();
  const [removeLike, { isLoading: isRemovingLike }] = useRemoveLikeMutation();

  useEffect(() => {
    if (likesData) {
      setLikes(likesData.count || 0);
      setIsLiked(likesData.isLiked || false);
    }
  }, [likesData]);

  const handleAddLike = useCallback(() => {
    addLike({ post_id })
      .unwrap()
      .then(() => {
        refetch();
      })
      .catch(error => console.error("Failed to like post:", error));
  }, [addLike, post_id, refetch]);

  const handleRemoveLike = useCallback(() => {
    removeLike({ post_id })
      .unwrap()
      .then(() => {
        refetch();
      })
      .catch(error => console.error("Failed to remove like:", error));
  }, [removeLike, post_id, refetch]);

  return {
    likes,
    isLiked,
    handleAddLike,
    handleRemoveLike,
    isLoading: isAddingLike || isRemovingLike,
  };
}
