import { Job } from "./job";

export interface Todo {
    id: number;
    description: string;
    completePercent: number;
    jobId?: number;
    job?: Job;
}