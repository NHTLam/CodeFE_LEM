export interface Classroom {
    id: number;
    code: string;
    name: string;
    description?: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}