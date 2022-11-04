import { BASE_URL, getAuthHeader } from "../Api";

interface UserCountData {
  message: string;
  data: number;
}

type UserCountResponse = false | UserCountData;

export const userCount = async (): Promise<UserCountResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/users/all?count=true`, {
      headers: getAuthHeader(localStorage.getItem("token") || ""),
    });

    if (!response.ok) {
      throw Error("Failed to fetch /all?count=true endpoint.");
    }

    return await response.json();
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};
