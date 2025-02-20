import { commentApi } from "@/services/comment.service";
import { RootState } from "@/shared/store";
import { IComment } from "@/types/comment.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  comments: IComment[];
}

const initialState: InitialState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      commentApi.endpoints.getComments.matchFulfilled,
      (state, { payload }) => {
        state.comments = payload;
      },
    );
    builder.addMatcher(
      commentApi.endpoints.createComment.matchFulfilled,
      (state, { payload }) => {
        state.comments.push(payload);
      },
    );
  },
});

export const { setComments } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
