import { AppUser } from "./app-user";
import { Question } from "./question";


export interface StudentAnswer {
    id: number;
    appUserId: number;
    appUserFeedbackId: number;
    grade: number;
    gradeAt: Date;
    feedback: string;
    submitAt: Date;
    name: string;
    questionId: number;
    question: Question;
    appUser: AppUser;
    appUserFeedback: AppUser;
}