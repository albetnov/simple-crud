import { ApiResponse, makePost, CommonApiResponse } from "../Api";

export interface UserRegistration {
  username: string;
  password: string;
  confirm_password: string;
  name: string;
  roles: "admin" | "user";
}

type RegisterUser = Promise<ApiResponse<CommonApiResponse<null> | null>>;

export const registerUser = async (fields: UserRegistration): RegisterUser => {
  console.log(fields);
  return await makePost<UserRegistration>("/register", {
    fields,
  });
};
