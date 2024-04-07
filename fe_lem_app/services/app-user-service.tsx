import { AppUser } from "@/models/app-user";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/app-user/";

export async function ListAppUser() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const AppUsers: AppUser[] = await res.json();
    return AppUsers;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function GetAppUser(id: number) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const AppUsers: AppUser = await res.json();
    return AppUsers;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function UpdateAppUser(request: Request) {
  const {
    id,
    fullName,
    userName,
    email,
    phone,
    gender,
    password,
    statusId,
  }: Partial<AppUser> = await request.json();

  const res = await fetch(DATA_SOURCE_URL + "update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      fullName,
      userName,
      email,
      phone,
      gender,
      password,
      statusId,
    }),
  });
  const newAppUser: AppUser = await res.json();
  return newAppUser;
}

export async function DeleteAppUser(request: Request) {
  const { id }: Partial<AppUser> = await request.json();

  if (!id) return NextResponse.json({ message: "AppUser id required" });

  await fetch(DATA_SOURCE_URL + "delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return id;
}

// export async function CreateAppUser(AppUser: any) {
//   try {
//     debugger;
//     const res = await fetch(DATA_SOURCE_URL + "create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: AppUser.name,
//         imageUrl: AppUser.imageUrl,
//       }),
//     });

//     const newAppUser: AppUser = await res.json();
//     return newAppUser; // Return the created AppUser if successful
//   } catch (error) {
//     // Handle network errors or unexpected exceptions
//     console.error("Error creating AppUser:", error);
//     return { error: "An unexpected error occurred." }; // Return a generic error message
//   }
// }
