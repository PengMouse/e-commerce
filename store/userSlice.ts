/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	userData: Record<string, any> | null;
}

const initialState: UserState = {
	userData: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userDetails: (state: any, action: any) => {
			state.userData = action.payload;
		},

		logOut: (state: any) => {
			state.userData = null;
		},
	},
});

export const { userDetails, logOut } = userSlice.actions;
export default userSlice.reducer;
