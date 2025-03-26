import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "../store/cartSlice";
import favoriteReducer from "../store/favoriteSlice";
import { combineReducers } from "redux";

// Configure persistence for reducers
const persistConfig = {
	key: "root", // Key to store data under in localStorage
	storage, // Storage engine
};

// Combine reducers
const rootReducer = combineReducers({
	cart: cartReducer,
	favorite: favoriteReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

// Persistor for rehydration
export const persistor = persistStore(store);

// Infer types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
