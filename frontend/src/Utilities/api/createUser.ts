import { ApiResponse, CommonActionApiResponse, makePost } from "../Api";

export interface CreateUser {
  name: string;
  username: string;
  password: string;
  roles: string;
  confirm_password: string;
}

type CreateUserResponse = Promise<ApiResponse<CommonActionApiResponse | null>>;

export const createUser = async (fields: CreateUser): CreateUserResponse => {
  return await makePost<CreateUser>("/users/create", {
    localToken: true,
    failedMessage: "Failed to create user",
    fields,
  });
};
