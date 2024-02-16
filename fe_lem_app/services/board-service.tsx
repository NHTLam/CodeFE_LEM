import { Board } from '@/models/board'
import { NextResponse } from 'next/server'

const DATA_SOURCE_URL = process.env.BASE_URL ?? process.env.PUBLIC_BASE_URL + "/lem/board/"

export async function FetchData() {
    // debugger;
    try
    {
        const res = await fetch(DATA_SOURCE_URL + "list",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })      
        debugger;
        const Boards: Board[] = await res.json()
        return Boards;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

export async function Get() {
    const res = await fetch(DATA_SOURCE_URL + "list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const Boards: Board[] = await res.json()
    return Boards;
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


export async function Create(boardData: { name: string; imageUrl: string }) {  
    debugger;
    const res = await fetch(DATA_SOURCE_URL + "create", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            boardData
        })
    })
    debugger;
    const newBoard: Board = await res.json()
    return newBoard
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
