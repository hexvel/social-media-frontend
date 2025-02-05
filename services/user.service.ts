import { api } from "@/services/api";
import { IUser } from "@/types/user.type";

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<IUser, string | number>({
      query: data => ({
        url: "/users.get",
        method: "GET",
        params: { owner: data },
      }),
    }),
    getProfile: builder.query({
      query: () => "/profile",
      keepUnusedDataFor: 1800,
      providesTags: ["Profile"],
    }),
    getUsers: builder.query({
      query: params => ({
        url: "/users",
        params,
      }),
      keepUnusedDataFor: 600,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }: { id: number | string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery } = userApi;

export const { getUser } = userApi.endpoints;
