import { userApi } from "@/services/user.service";
import { RootState } from "@/shared/store";
import { IUser } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      },
    );
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
