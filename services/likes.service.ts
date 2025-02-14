import { api } from "@/services/api";
import type { ILike } from "@/types/like.type";

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    addLike: builder.mutation<ILike, { post_id: number }>({
      query: body => ({
        url: "/likes/add",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    removeLike: builder.mutation<ILike, { post_id: number }>({
      query: body => ({
        url: "/likes/remove",
        method: "DELETE",
        body,
      }),
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    getLikes: builder.query<ILike, { post_id?: number }>({
      query: params => ({
        url: "/likes/get",
        method: "POST",
        body: params,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.post_id}`;
      },

      merge: (currentCache, newItems) => {
        return newItems;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
  }),
  overrideExisting: false,
});

export const { useAddLikeMutation, useGetLikesQuery, useRemoveLikeMutation } =
  likesApi;

export const { addLike, getLikes, removeLike } = likesApi.endpoints;
