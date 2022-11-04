import { CommonApiResponse, makeFetch } from "../Api";
import { User } from "./allUser";

type UserDetailResponse = false | CommonApiResponse<User>;

export const userDetail = async (id: number): Promise<UserDetailResponse> => {
  const fetch = await makeFetch(`/users/${id}`, {
    localToken: true,
  });

  if (!fetch) return false;

  return await fetch.json();
};
