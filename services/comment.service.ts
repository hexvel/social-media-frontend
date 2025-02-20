import { IComment, ICommentCreate } from "@/types/comment.type";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query<IComment[], { post_id: number }>({
      query: ({ post_id }) => ({
        url: "/comments/get",
        params: { post_id },
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<IComment, ICommentCreate>({
      query: comment => ({
        url: "/comments/create",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/comments/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
