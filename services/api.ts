import { RootState } from "@/shared/store";

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken ||
      localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    localStorage.removeItem("accessToken");
    await fetch("/api/refresh", { method: "POST" });
    window.location.href = "/auth/login";
  }

  return result;
};

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: retry(baseQueryWithReauth, { maxRetries: 1 }),
  refetchOnMountOrArgChange: false,
  keepUnusedDataFor: 600,
  tagTypes: ["Post", "User", "Comment", "Profile", "Like", "ProfileUser"],
  endpoints: () => ({}),
});
