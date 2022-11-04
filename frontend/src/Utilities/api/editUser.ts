import { ApiResponse, CommonActionApiResponse, makePost } from "../Api";
import { CreateUser } from "./createUser";

type EditUser = Promise<ApiResponse<CommonActionApiResponse | null>>;

interface CreateUserWithoutPassword {
  name: string;
  roles: string;
  username: string;
}

export type EditUserRequest = CreateUser | CreateUserWithoutPassword;

export const editUser = async (user: EditUserRequest, id: number): Promise<EditUser> => {
  return await makePost<EditUserRequest>(`/users/edit/${id}`, {
    localToken: true,
    fields: user,
    method: "PUT",
  });
};
