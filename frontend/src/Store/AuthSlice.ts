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

interface LoginPayload {
  token: string;
  time: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    user(state, action: { payload: UserType }) {
      state.user = action.payload;
    },
    login(state, action: { payload: LoginPayload }) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expiresIn", action.payload.time);
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
export const AuthAction = authSlice.actions;
