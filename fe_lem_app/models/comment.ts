import { ClassEvent } from "./classevent";

export interface Comment {
    id: number;
    classEventId: number;
    description: string;
    classEvent: ClassEvent;
}