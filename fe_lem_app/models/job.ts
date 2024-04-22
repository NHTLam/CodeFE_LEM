import { Card } from "./card";
import { Todo } from "./todo";
import { AppUserJobMapping } from "./appUserJobMapping";
import { AppUser } from "./app-user";

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
    creatorId?: number;
    createAt?: Date;
    updateAt?: Date;
    creator?: AppUser;
    todos?: Todo[];
    appUserJobMaping?: AppUserJobMapping[];
}