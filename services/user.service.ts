import { api } from "@/services/api";
import type { IUser } from "@/types/user.type";

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<IUser, string>({
      query: id => ({
        url: `/users/get`,
        method: "GET",
        params: { owner: id },
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getProfileUser: builder.query<IUser, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["ProfileUser"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useGetProfileUserQuery } = userApi;

export const { getUser, getProfileUser } = userApi.endpoints;
