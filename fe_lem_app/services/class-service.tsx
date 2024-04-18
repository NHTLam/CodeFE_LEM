import { Classroom } from "@/models/classroom";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/classroom/";

export async function ListClass() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Classes: Classroom[] = await res.json();
    return Classes;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function ListOwn(userId) {
  try {
    const newUserId = Number(userId);
    const res = await fetch(DATA_SOURCE_URL + "list-own", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ AppUserId: newUserId }),
    });
    const classes: Classroom[] = await res.json();
    return classes;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function JoinClass(code, token) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code: code }),
    });
    const isSuccess = await res.json();
    return isSuccess;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function GetClass(id: number) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const Classes: Classroom = await res.json();
    return Classes;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function UpdateClass(classroom) {
  const res = await fetch(DATA_SOURCE_URL + "update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      classroom,
    }),
  });
  const newClass: Classroom = await res.json();
  return newClass;
}

export async function DeleteClass(id) {
  await fetch(DATA_SOURCE_URL + "delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  return id;
}

export async function CreateClass(newClassData: any) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newClassData.name,
        homeImg: newClassData.imageUrl,
        appUserClassroomMappings: newClassData.appUserClassroomMappings,
      }),
    });

    const newClass: Classroom = await res.json();
    return newClass; // Return the created Class if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating Class:", error);
    return { error: "An unexpected error occurred." }; // Return a generic error message
  }
}
