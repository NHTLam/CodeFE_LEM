import { AppUser } from "@/models/app-user";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/app-user/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function ListAppUser() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const AppUsers: AppUser[] = await res.json();
    return AppUsers;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function ListAppUserByClassroom(classroomId: number) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list-by-classroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ classroomId }),
    });
    const appUsers: AppUser[] = await res.json();
    return appUsers;
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
        Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
    },
  });

  return id;
}
