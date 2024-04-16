import { ClassEvent } from '@/models/classevent'
import { FilterData } from '@/models/filter'
import { Question } from '@/models/question';
import { NextResponse } from 'next/server'

const DATA_SOURCE_URL = process.env.BASE_URL + "/tel/classroom/"

export async function CreateQuestion(question: any) {
    try {

        const res = await fetch(DATA_SOURCE_URL + "create-question", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: question.id,
                classEventId: question.classEventId,
                description: question.description,
                instruction: question.instruction,
                name: question.name,
                correctAnswer: question.correctAnswer,
                studentAnswer: question.studentAnswer,
                answers: question.answers,
            })
        });

        const newQuestion: Question = await res.json();
        return newQuestion; // Return the created board if successful
    } catch (error) {
        // Handle network errors or unexpected exceptions
        console.error('Error creating classevent:', error);
        return { error: 'An unexpected error occurred.' }; // Return a generic error message
    }
}

export async function UpdateQuestion(question: any) {

    const res = await fetch(DATA_SOURCE_URL + "update-question", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: question.id,
            classEventId: question.classEventId,
            description: question.description,
            instruction: question.instruction,
            name: question.name,
            correctAnswer: question.correctAnswer,
            studentAnswer: question.studentAnswer,
            answers: question.answers,
        })
    })
    const newQuestion: Question = await res.json()
    return newQuestion
}

export async function DeleteQuestion(question: any) {

    await fetch(DATA_SOURCE_URL + "delete-question", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: question.id
        })
    })

    return question.id;
}