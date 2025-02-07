interface LikesItem {
  id: number;
  userId: number;
  targetId: number;
  targetType: string;
  createdAt: Date;
}

export interface ILike {
  count: number;
  isLiked: boolean;
  likes: LikesItem[];
}
