import { api } from "@/services/api";
import { IPost, IPostCreate } from "@/types/post.type";

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<IPost[], { owner: string }>({
      query: ({ owner }) => ({
        url: "/posts/get",
        params: { owner },
      }),

      keepUnusedDataFor: 300,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }: { id: number | string }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    createPost: builder.mutation<IPost, IPostCreate>({
      query: data => ({
        url: "/posts/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deletePost: builder.mutation<IPost, { id: number }>({
      query: ({ id }) => ({
        url: "/posts/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query({
      query: id => ({ url: `/posts/getById`, params: { id } }),
      keepUnusedDataFor: 300,
      providesTags: (_, __, id) => [{ type: "Post", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;

export const { getPostById, getPosts } = postApi.endpoints;
