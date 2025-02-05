import { recommendationsApi } from "@/services/recommendation.service";
import { IPost } from "@/types/post.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  recommendations: { post: IPost }[];
}

const initialState: InitialState = {
  recommendations: [],
};

export const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    setRecommendations: (state, { payload }) => {
      state.recommendations = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      recommendationsApi.endpoints.getRecommendationPosts.matchFulfilled,
      (state, { payload }) => {
        state.recommendations = payload;
      },
    );
  },
});

export const { setRecommendations } = recommendationSlice.actions;
export const recommendationReducer = recommendationSlice.reducer;
