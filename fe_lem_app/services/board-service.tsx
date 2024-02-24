import { Board } from '@/models/board'
import { NextResponse } from 'next/server'

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/board/"

export async function FetchData() {
    try
    {
        const res = await fetch(DATA_SOURCE_URL + "list",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })   
        const Boards: Board[] = await res.json()
        return Boards;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

export async function Create(board : any){
    try {
        debugger;
        const res = await fetch(DATA_SOURCE_URL + "create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: board.name,
                imageUrl: board.imageUrl
            })
        });

        console.log(JSON.stringify({
            name: board.name,
            imageUrl: board.imageUrl
        }))
        
        const newBoard: Board = await res.json();
        return newBoard; // Return the created board if successful
    } catch (error) {
        // Handle network errors or unexpected exceptions
        console.error('Error creating board:', error);
        return { error: 'An unexpected error occurred.' }; // Return a generic error message
    }
}

export async function Update(request: Request) {
    const { 
        id,
        code,
        name,
        description,
        imageUrl,
        isFavourite,
        createdAt,
        updatedAt,
        deletedAt,
        card
    }: Partial<Board> = await request.json()
    
    const res = await fetch(DATA_SOURCE_URL + "update", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            code,
            name,
            description,
            imageUrl,
            isFavourite,
            createdAt,
            updatedAt,
            card
        })
    })
    const newBoard: Board = await res.json()
    return newBoard
}

export async function Delete(request: Request) {
    const { id }: Partial<Board> = await request.json()
    
    if (!id) return NextResponse.json({ "message": "Board id required" })

    await fetch(DATA_SOURCE_URL + "delete", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return id;
}

