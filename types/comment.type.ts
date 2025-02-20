import { IUser } from "./user.type";

export interface IComment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  author: IUser;
}

export interface ICommentCreate {
  content: string;
  post_id: number;
}
