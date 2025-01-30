import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUserData } from '@/types/user.type';

const initialState: IUserData = {
  username: "",
  firstName: "",
  lastName: "",
  bio: "",
  avatar: "",
}

export const UserSlice = createSlice({
	name: "UserSlice",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<IUserData>) => {
			state = payload
			return state
		}
	}
})