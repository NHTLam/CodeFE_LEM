const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/permission/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function ListPermission(classroomId) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list-permission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        classroomId: Number(classroomId),
      }),
    });
    const Permissions = await res.json();
    return Permissions;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
