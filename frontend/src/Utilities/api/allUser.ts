import { makeFetch } from "../Api";

export interface User {
  id: number;
  name: string;
  username: string;
  roles: string;
}

interface UserData {
  message: string;
  data: User[];
}

type UserDataResponse = false | UserData;

export const allUser = async (): Promise<UserDataResponse> => {
  const fetch = await makeFetch("/users/all", { localToken: true });

  if (!fetch) {
    return false;
  }

  return await fetch.json();
};
