import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (data) => {
        return {
          method: "POST",
          url: "login",
          body: data,
        };
      },
      transformResponse: (response) => {
        // @ts-ignore
        document.cookie = `token=${response.tokens.accessToken}; path=/; max-age=3600; secure; samesite=strict`;
        return response;
      },
    }),
    registerUser: builder.mutation<any, { email: string; password: string }>({
      query: (data) => {
        return {
          method: "POST",
          url: "register",
          body: data,
        };
      },
    }),
    refreshToken: builder.mutation<
      any,
      { username: string; sub: { id: string } }
    >({
      query: (user) => {
        return {
          method: "POST",
          url: "refresh",
          body: user,
        };
      },
      transformResponse: (response) => {
        // @ts-ignore
        localStorage.setItem("token", response.accessToken);
        return response;
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshTokenMutation,
} = AuthApi;
