/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	favItems: [],
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		toggleFavorite: (state: any, action: any) => {
			const existingItem = state.favItems.find((item: any) => item.id === action.payload);
			if (existingItem) {
				existingItem.favorite = !existingItem.favorite;
				state.favItems = state.favItems.filter((item: any) => item.id !== action.payload);
			} else {
				state.favItems.push({ ...action.payload, favorite: true });
			}
		},
		removeFavorite: (state: any, action: any) => {
			state.favItems = state.favItems.filter((item: any) => item.id !== action.payload);
		},
	},
});

export const { toggleFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
