import { IUser } from "./user.type";

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse extends IRefreshResponse {
  user: IUser;
}
