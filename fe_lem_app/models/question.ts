import { ClassEvent } from "./classevent";

export interface Question {
    id: number;
    classEventId: number;
    name: string;
    questionAnswer: string;
    studentAnswer?: string;
    description?: string;
    classEvent: ClassEvent;
}