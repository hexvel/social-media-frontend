import authReducer from "@/features/auth/authSlice";
import { commentSlice } from "@/features/comments/commentSlice";
import { friendSlice } from "@/features/friends/friendSlice";
import { likeSlice } from "@/features/likes/likeSlice";
import { postSlice } from "@/features/posts/postSlice";
import { recommendationSlice } from "@/features/recommendations/recommendationSlice";
import { userSlice } from "@/features/users/userSlice";
import { middleware } from "@/middlewares/auth.middleware";
import { api } from "@/services/api";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [recommendationSlice.reducerPath]: recommendationSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    [likeSlice.reducerPath]: likeSlice.reducer,
    [friendSlice.reducerPath]: friendSlice.reducer,
    [commentSlice.reducerPath]: commentSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).prepend(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
