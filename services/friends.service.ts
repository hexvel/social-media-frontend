import { api } from "@/services/api";
import { IUser } from "@/types/user.type";

export const friendsApi = api.injectEndpoints({
  endpoints: builder => ({
    getFollowers: builder.query<IUser[], void>({
      query: () => ({
        url: "/friends.getFollowers",
        method: "GET",
      }),
    }),
    getFollowing: builder.query<IUser[], void>({
      query: () => ({
        url: "/friends.getFollowing",
        method: "GET",
      }),
    }),
    getFriends: builder.query<IUser[], void>({
      query: () => ({
        url: "/friends.get",
        method: "GET",
      }),
    }),
    getStats: builder.query<
      { followers: IUser[]; following: IUser[]; friends: IUser[] },
      void
    >({
      query: () => ({
        url: "/friends.getStats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFriendsQuery,
  useGetStatsQuery,
} = friendsApi;
