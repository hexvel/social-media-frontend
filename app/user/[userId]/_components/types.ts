import { IUser } from "@/types/user.type";

export interface UserProps {
  user: IUser;
  onInfoClick: () => void;
}
