import { userApi } from "@/services/user.service";
import { RootState } from "@/shared/store";
import { IUser } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  profileUser: IUser | null;
}

const initialState: InitialState = {
  profileUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileUser: (state, { payload }) => {
      state.profileUser = payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.profileUser = payload;
      },
    );
  },
});

export const { setProfileUser } = userSlice.actions;

export const selectProfileUser = (state: RootState) => state.user.profileUser;
