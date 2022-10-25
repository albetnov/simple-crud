const BASE_URL = "http://localhost:3000";

const getAuthHeader = (token: string) => ({
  Authorization: "Bearer " + token,
});

export const checkLoginStatus = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/current`, {
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      throw Error("Failed to fetch /me endpoint.");
    }

    return response;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};
