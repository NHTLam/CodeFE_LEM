import { Question } from "./question";


export interface Answer {
    id: number;
    code: string;
    name: string;
    questionId: number;
    question: Question;
}