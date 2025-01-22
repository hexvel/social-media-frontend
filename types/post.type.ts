import { Media } from "./media.type";

export interface IPost {
  content: string;
  photos?: Media[];
  createdAt: Date;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
