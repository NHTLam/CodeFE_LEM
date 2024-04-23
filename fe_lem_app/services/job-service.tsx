import { Job } from "@/models/job";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/job/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function ListJob() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const Jobs: Job[] = await res.json();
    return Jobs;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function ListOwnJob() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list-own", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const Jobs: Job[] = await res.json();
    return Jobs;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function GetJob(id: number) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const Jobs: Job = await res.json();
    return Jobs;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function CreateJob(job: Job, classroomId) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cardId: job.cardId,
        name: job.name,
        decription: job.description,
        startAt: job.startAt,
        endAt: job.endAt,
        todos: job.todos,
        isAllDay: job.isAllDay,
        creatorId: job.creatorId,
        appUserJobMapping: job.appUserJobMaping,
        classroomId: Number(classroomId),
      }),
    });

    const newJob: Job = await res.json();
    return newJob; // Return the created Job if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating Job:", error);
    return null;
  }
}

export async function UpdateJob(job: Job, classroomId) {
  const res = await fetch(DATA_SOURCE_URL + "update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: job.id,
      cardId: job.cardId,
      name: job.name,
      description: job.description,
      startAt: job.startAt,
      endAt: job.endAt,
      todos: job.todos,
      isAllDay: job.isAllDay,
      creatorId: job.creatorId,
      appUserJobMapping: job.appUserJobMaping,
      classroomId: Number(classroomId),
    }),
  });
  const newJob: Job = await res.json();
  return newJob;
}

export async function DeleteJob(jobId: number, classroomId) {
  await fetch(DATA_SOURCE_URL + "delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: jobId,
      classroomId: Number(classroomId),
    }),
  });

  return jobId;
}
