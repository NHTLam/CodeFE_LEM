import { AppUser } from '@/models/app-user';
import { ClassEvent } from '@/models/classevent'
import { FilterData } from '@/models/filter'
import { StudentAnswer } from '@/models/studentAnswer';
import { NextResponse } from 'next/server'

const DATA_SOURCE_URL = process.env.BASE_URL + "/tel/classroom/"

export async function CreateStudentAnswer(StudentAnswer: any) {
    try {

        const res = await fetch(DATA_SOURCE_URL + "create-student-answer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: StudentAnswer.id,
                questionId: StudentAnswer.questionId,
                name: StudentAnswer.name,
                appUserId: StudentAnswer.appUserId,
            })
        });

        const newStudentAnswer: StudentAnswer = await res.json();
        return newStudentAnswer; // Return the created board if successful
    } catch (error) {
        // Handle network errors or unexpected exceptions
        console.error('Error creating classevent:', error);
        return { error: 'An unexpected error occurred.' }; // Return a generic error message
    }
}

export async function UpdateStudentAnswer(StudentAnswer: any) {

    const res = await fetch(DATA_SOURCE_URL + "update-student-answer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: StudentAnswer.id,
            questionId: StudentAnswer.questionId,
            name: StudentAnswer.name,
            appUserId: StudentAnswer.appUserId,
            appUserFeedbackId: StudentAnswer.appUserFeedbackId,
            feedback: StudentAnswer.feedback,
            grade: StudentAnswer.grade,

        })
    })
    const newStudentAnswer: StudentAnswer = await res.json()
    return newStudentAnswer
}

export async function DetailStudentAnswer(StudentAnswer: any) {

    const res = await fetch(DATA_SOURCE_URL + "detail-student-answer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 0,
            questionId: 1,
            name: "",
            appUserId: StudentAnswer.appUserId,
            classEventId: StudentAnswer.classEventId,

        })
    })
    const newStudentAnswer: StudentAnswer = await res.json()
    return newStudentAnswer
}

export async function ListStudentAnswer(StudentAnswer: any) {

    const res = await fetch(DATA_SOURCE_URL + "list-student-answer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 0,
            name: "",
            classEventId: StudentAnswer.classEventId,

        })
    })
    const newStudentAnswer: AppUser = await res.json()
    return newStudentAnswer
}

export async function DeleteStudentAnswer(StudentAnswer: any) {

    await fetch(DATA_SOURCE_URL + "delete-StudentAnswer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: StudentAnswer.id
        })
    })

    return StudentAnswer.id;
}