import { api } from "@/services/api";
import { ILoginResponse } from "@/types/response.type";
import { IUser, IUserData } from "@/types/user.type";

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    register: builder.mutation<IUser, IUserData>({
      query: credentials => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export const { login, register } = authApi.endpoints;
