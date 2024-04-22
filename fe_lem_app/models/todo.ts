import { Job } from "./job";

export interface Todo {
    id: number;
    description: string;
    isDone?: boolean;
    jobId?: number;
    job?: Job;
}