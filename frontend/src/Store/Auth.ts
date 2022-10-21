import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: authSlice.reducer,
});

export default store;
export type StoreState = ReturnType<typeof store.getState>;
