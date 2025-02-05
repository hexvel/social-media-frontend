import authReducer from "@/features/auth/authSlice";
import { userSlice } from "@/features/users/userSlice";
import { middleware } from "@/middlewares/auth.middleware";
import { api } from "@/services/api";
import { userApi } from "@/services/user.service";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .prepend(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
