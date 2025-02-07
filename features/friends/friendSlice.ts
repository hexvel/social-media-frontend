import { friendsApi } from "@/services/friends.service";
import { RootState } from "@/shared/store";
import { IUser } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  followers: IUser[] | null;
  following: IUser[] | null;
  friends: IUser[] | null;
}

const initialState: InitialState = {
  followers: null,
  following: null,
  friends: null,
};

export const friendSlice = createSlice({
  name: "friends",
  initialState,

  reducers: {
    setFollowers: (state, { payload }) => {
      state.followers = payload;
    },
    setFollowing: (state, { payload }) => {
      state.following = payload;
    },
    setFriends: (state, { payload }) => {
      state.friends = payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      friendsApi.endpoints.getFollowers.matchFulfilled,
      (state, { payload }) => {
        state.followers = payload;
      },
    );
    builder.addMatcher(
      friendsApi.endpoints.getFollowing.matchFulfilled,
      (state, { payload }) => {
        state.following = payload;
      },
    );
    builder.addMatcher(
      friendsApi.endpoints.getFriends.matchFulfilled,
      (state, { payload }) => {
        state.friends = payload;
      },
    );
  },
});

export const { setFollowers, setFollowing, setFriends } = friendSlice.actions;
export const friendReducer = friendSlice.reducer;

export const selectFollowers = (state: RootState) => state.friends.followers;
export const selectFollowing = (state: RootState) => state.friends.following;
export const selectFriends = (state: RootState) => state.friends.friends;
