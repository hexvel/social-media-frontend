import { Media } from "./media.type";
import { IUser } from "./user.type";

export interface IPost {
  id: number;
  content: string;
  photos?: Media[];
  createdAt: Date;
  author: IUser;
}

export interface IPostCreate {
  content: string;
  photos?: Media[];
  tags: string[];
}
