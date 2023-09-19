import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res=>{
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist()
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'c81aec4b-4891-4326-ae01-7e554eafbdba'
        todolistAPI.deleteTodolist(todolistId)
            .then(res=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = '36f330ae-7cc6-4643-a0b9-27b7c86617ed'
    let title = 'LOL'
    useEffect(() => {
       todolistAPI.updateTodolist(title,todolistId)
            .then(res=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

