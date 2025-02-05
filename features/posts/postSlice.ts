import { postApi } from "@/services/post.service";
import { IPost } from "@/types/post.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  post: IPost | null;
  posts: IPost[] | null;
}

const initialState: InitialState = {
  post: null,
  posts: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost: (state, { payload }) => {
      state.post = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      postApi.endpoints.getPostById.matchFulfilled,
      (state, { payload }) => {
        state.post = payload;
      },
    );
    builder.addMatcher(
      postApi.endpoints.getPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = payload;
      },
    );
  },
});

export const { setPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
