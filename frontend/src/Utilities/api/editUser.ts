import { ApiResponse, CommonActionApiResponse, makePost } from "../Api";
import { CreateUser } from "./createUser";

type EditUser = Promise<ApiResponse<CommonActionApiResponse | null>>;

export const editUser = async (user: CreateUser, id: number): Promise<EditUser> => {
  return await makePost<CreateUser>(`/users/edit/${id}`, {
    localToken: true,
    fields: user,
    failedMessage: "Failed to edit user",
  });
};
