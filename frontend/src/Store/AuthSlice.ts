import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  id: number;
  username: string;
  password: string;
  roles: string;
  iat: number;
  exp: number;
}
interface StateType {
  isLoggedIn: boolean;
  user: UserType | null;
}

const initialState: StateType = { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    user(state, action: { payload: UserType }) {
      state.user = action.payload;
    },
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
