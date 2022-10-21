import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: { payload: string }) {
      localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
export const AuthAction = authSlice.actions;
