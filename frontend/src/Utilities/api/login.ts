import { ApiResponse, BASE_URL, checkForValidationError } from "../Api";

export interface UserLogin {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: number;
}

export const loginUser = async (fields: UserLogin): Promise<ApiResponse<LoginResponse>> => {
  console.log(fields);

  console.log(fields);
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const validationError = await checkForValidationError(res);

    if (validationError) {
      return validationError;
    }

    if (!res.ok) {
      throw Error("Failed to loggin in user");
    }

    return { json: await res.json(), code: 200 };
  } catch (err: any) {
    console.log(err.message);
    return { code: 500 };
  }
};
