import { api } from "@/services/api";
import { IPost } from "@/types/post.type";

export const recommendationsApi = api.injectEndpoints({
  endpoints: builder => ({
    getRecommendationPosts: builder.query<IPost[], void>({
      query: () => ({
        url: "/recommendations/getPosts",
        method: "GET",
      }),
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const { useGetRecommendationPostsQuery } = recommendationsApi;

export const { getRecommendationPosts } = recommendationsApi.endpoints;
