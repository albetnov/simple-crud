export const BASE_URL = "http://localhost:3000";

export const getAuthHeader = (token: string) => "Bearer " + token;

interface FetchOptions extends RequestInit {
  localToken?: boolean;
  token?: string;
}

const getLocalAuthHeader = (localToken: boolean, token?: string) => {
  if (localToken) {
    token = localStorage.getItem("token") || "";
  }

  if (token && token !== "") {
    return getAuthHeader(token);
  }
  return false;
};

export const makeFetch = async (url: string, options: FetchOptions) => {
  try {
    const getAuth = getLocalAuthHeader(Boolean(options.localToken), options.token);

    if (getAuth) {
      options.headers = { ...options.headers, Authorization: getAuth, Accept: "application/json" };
    }

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      throw Error(`Failed to fetch ${url} endpoint.`);
    }

    return response;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};

export const checkLoginStatus = async (token: string) => {
  return makeFetch("/users/current", {
    token,
  });
};

export interface ApiResponse<T> {
  json?: T;
  message?: string;
  errors?: {
    details: string;
  };
  code: number;
}

export interface CommonApiResponse<T> {
  message: string;
  data?: T;
  status: number;
}

export interface CommonActionApiResponse {
  message: string;
  status: number;
}

export const checkForValidationError = async (
  res: Response
): Promise<ApiResponse<null> | false> => {
  if (res.status === 422) {
    const data = await res.json();
    if (!("details" in data)) {
      return { message: "Validation", errors: { details: data.message }, code: 422 };
    }
    return {
      message: "Validation Error: ",
      errors: { details: data.details[0].message },
      code: 422,
    };
  }
  return false;
};

interface PostOptions<T> extends FetchOptions {
  fields?: T;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
}

export const makePost = async <T>(url: string, options: PostOptions<T>) => {
  try {
    const getAuth = getLocalAuthHeader(Boolean(options.localToken), options.token);

    options.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (getAuth) {
      options.headers = {
        ...options.headers,
        Authorization: getAuth,
      };
    }

    const res = await fetch(`${BASE_URL}${url}`, {
      method: options.method || "POST",
      body: options.fields ? JSON.stringify(options.fields) : null,
      headers: options.headers,
    });

    const validationError = await checkForValidationError(res);

    if (validationError) {
      return validationError;
    }

    if (res.status > 399) {
      throw Error((await res.json()).message);
    }

    return { json: await res.json(), code: 200 };
  } catch (err: any) {
    console.log(err.message);
    return { code: 500, message: err.message };
  }
};
