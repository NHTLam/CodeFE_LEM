import { ClassEvent } from "@/models/classevent";
import { FilterData } from "@/models/filter";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/classroom/";

export async function ListClassEvent(filter: FilterData) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list-class-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: filter.id,
        code: filter.code,
        name: filter.name,
        pinned: filter.pinned,
        isClassWork: filter.isClassWork,
        skip: filter.skip,
        take: filter.take,
        ordertype: filter.ordertype,
        orderby: filter.orderby,
      }),
    });
    const Classevents: ClassEvent[] = await res.json();
    return Classevents;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function GetClassEvent(filter: FilterData) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get-class-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: filter.id,
        code: filter.code,
        name: filter.name,
      }),
    });
    const Classevents: ClassEvent = await res.json();
    return Classevents;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function CreateClassEvent(classevent: any) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create-class-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: classevent.id,
        classroomId: classevent.classroomId,
        code: classevent.code,
        name: classevent.name,
        isClassWork: classevent.isClassWork,
        description: classevent.description,
        pinned: classevent.pinned,
        createdAt: classevent.createdAt,
        endAt: classevent.endAt,
        startAt: classevent.startAt,
        updatedAt: classevent.updatedAt,
        deletedAt: classevent.deletedAt,
        comment: classevent.comment,
        question: classevent.question,
      }),
    });

    const newClassEvent: ClassEvent = await res.json();
    return newClassEvent; // Return the created board if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating classevent:", error);
    return { error: "An unexpected error occurred." }; // Return a generic error message
  }
}

export async function UpdateClassEvent(classevent: any) {
  const res = await fetch(DATA_SOURCE_URL + "update-class-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: classevent.id,
      classroomId: classevent.classroomId,
      code: classevent.code,
      name: classevent.name,
      isClassWork: classevent.isClassWork,
      description: classevent.description,
      pinned: classevent.pinned,
      createdAt: classevent.createdAt,
      startAt: classevent.startAt,
      endAt: classevent.endAt,
      updatedAt: classevent.updatedAt,
      deletedAt: classevent.deletedAt,
      comment: classevent.comment,
      question: classevent.question,
    }),
  });
  const newClassEvent: ClassEvent = await res.json();
  return newClassEvent;
}

export async function DeleteClassEvent(request: Request) {
  const { id }: Partial<ClassEvent> = await request.json();

  if (!id) return NextResponse.json({ message: "ClassEvent id required" });

  await fetch(DATA_SOURCE_URL + "delete-class-event", {
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
