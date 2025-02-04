import { authApi } from "@/services/auth";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    localStorage.setItem("accessToken", action.payload.accessToken);
    // listenerApi.dispatch(setUser(action.payload.user));
  },
});

export const { middleware } = listenerMiddleware;
