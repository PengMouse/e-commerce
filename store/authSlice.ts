/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	authToken: any;
	refreshToken: any;
}

const initialState: UserState = {
	authToken: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: "authToken",
	initialState,
	reducers: {
		storeUserAuthToken: (state: any, action: any) => {
			state.authToken = action.payload;
		},
		storeUserRefreshToken: (state: any, action: any) => {
			state.refreshToken = action.payload;
		},

		logOut: (state: any) => {
			state.authToken = null;
		},
	},
});

export const { storeUserAuthToken, storeUserRefreshToken, logOut } = authSlice.actions;
export default authSlice.reducer;
