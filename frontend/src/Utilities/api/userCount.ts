import { makeFetch } from "../Api";

interface UserCountData {
  message: string;
  data: number;
}

type UserCountResponse = false | UserCountData;

export const userCount = async (): Promise<UserCountResponse> => {
  const fetch = await makeFetch("/users/all?count=true", { localToken: true });

  if (!fetch) {
    return false;
  }

  return await fetch.json();
};
