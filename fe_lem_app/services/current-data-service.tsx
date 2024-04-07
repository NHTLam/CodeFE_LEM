const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/app-user/";

export async function GetUserId(token) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get-user-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userId = await res.json();
    return userId;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
