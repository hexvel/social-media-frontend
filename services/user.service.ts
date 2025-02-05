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
  }),
});

export const { useGetUserQuery } = userApi;

export const { getUser } = userApi.endpoints;
