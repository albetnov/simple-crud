import { ApiResponse, BASE_URL, checkForValidationError, MessageResponse } from "../Api";

export interface UserRegistration {
  username: string;
  password: string;
  confirm_password: string;
  name: string;
  roles: "admin" | "user";
}

export const registerUser = async (
  fields: UserRegistration
): Promise<ApiResponse<MessageResponse>> => {
  console.log(fields);
  try {
    const res = await fetch(`${BASE_URL}/register`, {
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
      throw Error("Failed to register user");
    }

    return { json: await res.json(), code: 200 };
  } catch (err: any) {
    console.log(err.message);
    return { code: 500 };
  }
};
