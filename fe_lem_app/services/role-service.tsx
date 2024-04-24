const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/role/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function ListRole(classroomId, isFull) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        classroomId: Number(classroomId),
        isFull: isFull,
      }),
    });
    const roles = await res.json();
    return roles;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function GetRole(id: number, classroomId) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, classroomId: Number(classroomId) }),
    });
    const roles = await res.json();
    return roles;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function CreateRole(role, classroomId) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: role.name,
        decription: role.description,
        permissionRoleMappings: role.permissionRoleMappings,
        classroomId: Number(classroomId),
      }),
    });

    const newRole = await res.json();
    return newRole; // Return the created Role if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating Role:", error);
    return { error: "An unexpected error occurred." }; // Return a generic error message
  }
}

export async function UpdateRole(role, classroomId) {
  const res = await fetch(DATA_SOURCE_URL + "update-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: role.id,
      name: role.name,
      description: role.description,
      classroomId: Number(classroomId),
    }),
  });
  const newRole = await res.json();
  return newRole;
}

export async function DeleteRole(roleId: number, classroomId) {
  await fetch(DATA_SOURCE_URL + "delete-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: roleId,
      classroomId: Number(classroomId),
    }),
  });

  return roleId;
}
