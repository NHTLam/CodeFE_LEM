import { Card } from "./card";
import { Todo } from "./todo";
import { AppUserJobMapping } from "./appUserJobMapping";

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
    isAllDay?: boolean;
    card?: Card;
    todos?: Todo[];
    appUserJobMaping?: AppUserJobMapping[];
}