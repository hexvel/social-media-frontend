import { api } from "@/services/api";

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: params => ({
        url: "/posts.get",
        params,
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
    getPostById: builder.query({
      query: id => `/posts.getById?id=${id}`,
      keepUnusedDataFor: 300,
      providesTags: (_, __, id) => [{ type: "Post", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostByIdQuery } = postApi;

export const { getPostById } = postApi.endpoints;
