export const BASE_URL = "http://localhost:3000";

const getAuthHeader = (token: string) => ({
  Authorization: "Bearer " + token,
});

export const checkLoginStatus = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/current`, {
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      throw Error("Failed to fetch /current endpoint.");
    }

    return response;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};

export interface MessageResponse {
  message: string;
}

export interface ResJson<T> {
  json: T;
  code: number;
}

export interface ResError {
  message: string;
  details: string;
  code: number;
}

export interface ResUnknownError {
  code: number;
}

export type ApiResponse<T> = ResJson<T> | ResError | ResUnknownError;

export const checkForValidationError = async (res: Response): Promise<ResError | false> => {
  if (res.status === 422) {
    const data = await res.json();
    if (!("details" in data)) {
      return { message: "Validation", details: data.message, code: 422 };
    }
    return { message: "Validation Error: ", details: data.details[0].message, code: 422 };
  }
  return false;
};
