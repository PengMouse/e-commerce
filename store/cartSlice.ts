/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [], // Initialize items as an empty array
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state: any, action: any) => {
			const existingItem: any = state.items.find((item: any) => item.id === action.payload.id);
			if (existingItem) {
				existingItem.quantity += action.payload.quantity || 1;
			} else {
				state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
			}
		},

		removeItem: (state, action) => {
			state.items = state.items.filter((item: any) => item.id !== action.payload);
		},

		increaseItem: (state, action) => {
			const item: any = state.items.find((item: any) => item.id === action.payload);
			if (item) {
				item.quantity += 1;
			}
		},

		decreaseItem: (state, action) => {
			const item: any = state.items.find((item: any) => item.id === action.payload);
			if (item) {
				if (item.quantity > 1) {
					item.quantity -= 1;
				} else {
					state.items = state.items.filter((item: any) => item.id !== action.payload);
				}
			}
		},

		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, increaseItem, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
