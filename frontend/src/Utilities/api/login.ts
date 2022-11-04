import { ApiResponse, makePost } from "../Api";

export interface UserLogin {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: number;
}

type LoginUser = Promise<ApiResponse<LoginResponse | null>>;

export const loginUser = async (fields: UserLogin): LoginUser => {
  return await makePost<UserLogin>("/login", {
    fields,
    failedMessage: "Failed to login user",
  });
};
