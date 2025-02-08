import { Media } from "./media.type";

export interface IPost {
  id: number;
  content: string;
  photos?: Media[];
  createdAt: Date;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface IPostCreate {
  content: string;
  photos?: Media[];
  tags: string[];
}
