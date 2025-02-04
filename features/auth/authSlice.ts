import { authApi } from "@/services/auth";
import { RootState } from "@/shared/store";
import { IUser } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: IUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isAuthenticated = true;
          state.accessToken = payload.accessToken;
        },
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;
