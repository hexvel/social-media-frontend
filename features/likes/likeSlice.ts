import { likesApi } from "@/services/likes.service";
import { RootState } from "@/shared/store";
import { Like } from "@/types/like.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  likes: Like[] | null;
}

const initialState: InitialState = {
  likes: null,
};

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, { payload }) => {
      state.likes = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      likesApi.endpoints.getLikes.matchFulfilled,
      (state, { payload }) => {
        state.likes = payload;
      },
    );
  },
});

export const { setLikes } = likeSlice.actions;
export const likeReducer = likeSlice.reducer;

export const selectLikes = (state: RootState) => state.likes.likes;
