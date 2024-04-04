import { AppUser } from "@/models/app-user";
import { NextResponse } from "next/server";
import { toast } from "sonner";

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

export async function GetUserId() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get-user-id", {
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

export async function Register(AppUser: any) {
  try {
    debugger;
    const res = await fetch(DATA_SOURCE_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: AppUser.fullName,
        userName: AppUser.userName,
        email: AppUser.email,
        phone: AppUser.phone,
        gender: AppUser.gender,
        password: AppUser.password,
        statusId: 1,
      }),
    });

    const newAppUser = await res.json();
    console.log("Status: " + res.status);
    return newAppUser;
  } catch (error) {
    console.error("Error creating AppUser:", error);
    return false;
  }
}

export async function Login(AppUser: any) {
  try {
    debugger;
    const res = await fetch(DATA_SOURCE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: AppUser.userName,
        password: AppUser.password,
      }),
    });

    return res.status; // Return the created AppUser if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating AppUser:", error);
    return null; // Return a generic error message
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
