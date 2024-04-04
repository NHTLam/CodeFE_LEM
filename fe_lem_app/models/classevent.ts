import { Comment } from "./comment";
import { Question } from "./question";
import { Classroom } from "./classroom";

export type ClassEvent = {
  id: number;
  classroomId: number;
  code: string;
  name: string;
  isClassWork: boolean;
  description?: string;
  instruction?: string;
  pinned: boolean;
  createdAt: Date;
  endAt?: Date;
  updatedAt: Date;
  deletedAt?: Date;
  comment?: Comment[]; 
  question?: Question[]; 
  classroom: Classroom; 
};