import { ApiResponse, CommonActionApiResponse, makePost } from "../Api";

type DeleteUser = Promise<ApiResponse<CommonActionApiResponse | null>>;

export const deleteUser = async (id: number): Promise<DeleteUser> => {
  return await makePost(`/users/delete/${id}`, {
    localToken: true,
    method: "DELETE",
  });
};
