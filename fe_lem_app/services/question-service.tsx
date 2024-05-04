import { Question } from "@/models/question";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/classroom/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function CreateQuestion(question: any, classroomId) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: question.id,
        classEventId: question.classEventId,
        description: question.description,
        instruction: question.instruction,
        name: question.name,
        correctAnswer: question.correctAnswer,
        studentAnswers: question.studentAnswers,
        answers: question.answers,
        classroomId: Number(classroomId),
      }),
    });

    const newQuestion: Question = await res.json();
    return newQuestion; // Return the created board if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating classevent:", error);
    return { error: "An unexpected error occurred." }; // Return a generic error message
  }
}

export async function UpdateQuestion(question: any, classroomId) {
  const res = await fetch(DATA_SOURCE_URL + "update-question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: question.id,
      classEventId: question.classEventId,
      description: question.description,
      instruction: question.instruction,
      name: question.name,
      correctAnswer: question.correctAnswer,
      studentAnswers: question.studentAnswers,
      answers: question.answers,
      attachments: question.attachments,
      classroomId: Number(classroomId),
    }),
  });
  const newQuestion: Question = await res.json();
  return newQuestion;
}

export async function DeleteQuestion(question: any, classroomId) {
  await fetch(DATA_SOURCE_URL + "delete-question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: question.id,
      classroomId: Number(classroomId),
    }),
  });

  return question.id;
}
