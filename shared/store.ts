import authReducer from "@/features/auth/authSlice";
import { postSlice } from "@/features/posts/postSlice";
import { recommendationSlice } from "@/features/recommendations/recommendationSlice";
import { userSlice } from "@/features/users/userSlice";
import { middleware } from "@/middlewares/auth.middleware";
import { api } from "@/services/api";
import { postApi } from "@/services/post.service";
import { recommendationsApi } from "@/services/recommendation.service";
import { userApi } from "@/services/user.service";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [recommendationSlice.reducerPath]: recommendationSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .concat(recommendationsApi.middleware)
      .concat(postApi.middleware)
      .prepend(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
