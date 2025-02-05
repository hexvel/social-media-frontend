import { api } from "@/services/api";
import { IPost } from "@/types/post.type";

export const recommendationsApi = api.injectEndpoints({
  endpoints: builder => ({
    getRecommendationPosts: builder.query<{ post: IPost }[], void>({
      query: () => ({
        url: "/recommendations.getPosts",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRecommendationPostsQuery } = recommendationsApi;

export const { getRecommendationPosts } = recommendationsApi.endpoints;
