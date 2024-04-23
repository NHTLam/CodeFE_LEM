import { ClassEvent } from "@/models/classevent";
const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/classroom/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function CreateComment(comment: any) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: comment.id,
        classEventId: comment.classEventId,
        appUserId: comment.appUserId,
        description: comment.description,
      }),
    });

    const newComment: Comment = await res.json();
    return newComment; // Return the created board if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating classevent:", error);
    return { error: "An unexpected error occurred." }; // Return a generic error message
  }
}

export async function UpdateComment(comment: any) {
  const res = await fetch(DATA_SOURCE_URL + "update-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: comment.id,
      classEventId: comment.classEventId,
      description: comment.description,
    }),
  });
  const newComment: Comment = await res.json();
  return newComment;
}

export async function DeleteComment(comment: any) {
  await fetch(DATA_SOURCE_URL + "delete-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: comment.id,
      classEventId: 1,
      appUserId: 1,
      description: "",
    }),
  });

  return comment.id;
}
