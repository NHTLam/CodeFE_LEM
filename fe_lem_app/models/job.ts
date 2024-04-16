import { Card } from "./card";
import { Todo } from "./todo";

export interface Job {
    id?: number;
    cardId?: number;
    name?: string;
    description?: string;
    order?: number;
    startAt?: Date;
    endAt?: Date;
    color?: string;
    noTodoDone?: number;
    card?: Card;
    todos?: Todo[];
}