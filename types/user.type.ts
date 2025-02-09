export interface IUser {
  id: number;
  username?: string;
  firstName: string;
  lastName: string;
  bio?: string | null;
  isVerified: boolean;
  avatar?: string | null;
  createdAt: string;
}

export interface IUserData extends Omit<IUser, "id" | "createdAt"> {}
