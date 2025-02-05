import { authApi } from "@/services/auth.service";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    localStorage.setItem("accessToken", action.payload.accessToken);
  },
});

export const { middleware } = listenerMiddleware;
