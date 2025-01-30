import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { AuthApi } from './api/auth.api'
import { UserSlice } from './slices/user.slice'


const reducers = combineReducers({
	[AuthApi.reducerPath]: AuthApi.reducer,
	UserSlice: UserSlice.reducer
})

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware)
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']