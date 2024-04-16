const DATA_SOURCE_URL = process.env.BASE_URL + "lem/role/";

export async function ListRole() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const roles = await res.json();
    return roles;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function GetRole(id: number) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const roles = await res.json();
    return roles;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function CreateRole(role) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: role.name,
        decription: role.description,
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

export async function UpdateRole(role) {
  const res = await fetch(DATA_SOURCE_URL + "update-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: role.id,
      name: role.name,
      description: role.description,
    }),
  });
  const newRole = await res.json();
  return newRole;
}

export async function DeleteRole(roleId: number) {
  await fetch(DATA_SOURCE_URL + "delete-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: roleId,
    }),
  });

  return roleId;
}
