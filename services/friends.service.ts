import { api } from "@/services/api";
import { IUser } from "@/types/user.type";

export const friendsApi = api.injectEndpoints({
  endpoints: builder => ({
    getFollowers: builder.query<IUser[], void>({
      query: () => ({
        url: "/friends.getFollowers",
        method: "GET",
      }),
      providesTags: ["Friends", { type: "Friends", id: "LIST" }],
    }),
    getFollowing: builder.query<IUser[], void>({
      query: () => ({
        url: "/friends.getFollowing",
        method: "GET",
      }),
      providesTags: ["Friends", { type: "Friends", id: "LIST" }],
    }),
    getFriends: builder.query<IUser[], void>({
      query: () => ({
        url: "/friends.get",
        method: "GET",
      }),
      providesTags: ["Friends", { type: "Friends", id: "LIST" }],
    }),
    getStats: builder.query<
      { followers: IUser[]; following: IUser[]; friends: IUser[] },
      void
    >({
      query: () => ({
        url: "/friends.getStats",
        method: "GET",
      }),
      providesTags: ["Friends", { type: "Friends", id: "LIST" }],
    }),
    addFriend: builder.mutation<void, { user_id: number }>({
      query: ({ user_id }) => ({
        url: "/friends.add",
        method: "POST",
        body: { user_id },
      }),
      invalidatesTags: [
        "User",
        "Friends",
        { type: "User", id: "LIST" },
        { type: "Friends", id: "LIST" },
      ],
    }),
    deleteFriend: builder.mutation<void, { user_id: number }>({
      query: ({ user_id }) => ({
        url: "/friends.delete",
        method: "DELETE",
        body: { user_id },
      }),
      invalidatesTags: [
        "User",
        "Friends",
        { type: "User", id: "LIST" },
        { type: "Friends", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFriendsQuery,
  useGetStatsQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
} = friendsApi;
