import { ClassEvent } from '@/models/classevent'
import { FilterData } from '@/models/filter'
import { NextResponse } from 'next/server'

const DATA_SOURCE_URL = process.env.BASE_URL + "/tel/classroom/"

export async function CreateComment(comment: any) {
    try {

        const res = await fetch(DATA_SOURCE_URL + "create-comment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: comment.id,
                classEventId: comment.classEventId,
                description: comment.description,
            })
        });

        const newComment: Comment = await res.json();
        return newComment; // Return the created board if successful
    } catch (error) {
        // Handle network errors or unexpected exceptions
        console.error('Error creating classevent:', error);
        return { error: 'An unexpected error occurred.' }; // Return a generic error message
    }
}

export async function UpdateComment(comment: any) {

    const res = await fetch(DATA_SOURCE_URL + "update-comment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: comment.id,
            classEventId: comment.classEventId,
            description: comment.description,
        })
    })
    const newComment: Comment = await res.json()
    return newComment
}

export async function DeleteComment(comment: any) {

    await fetch(DATA_SOURCE_URL + "delete-comment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: comment.id
        })
    })

    return comment.id;
}