const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/app-user/";

export async function Register(AppUser: any) {
  try {
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

    var token = await res.json();
    localStorage.setItem("token", token.token);
    return res; // Return the created AppUser if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating AppUser:", error);
    return null; // Return a generic error message
  }
}
