import React, {useEffect, useState} from 'react'
import axios from "axios";
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = 'c2499e20-080d-4ead-b829-1e7a44bb389f'
        taskAPI.getTasks(todoId)
            .then(res=>{
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'c2499e20-080d-4ead-b829-1e7a44bb389f'
        let title = 'dasdasd'
        taskAPI.createTask(todolistId,title)
            .then((res)=>{
                debugger
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state,setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'c2499e20-080d-4ead-b829-1e7a44bb389f'
        let taskId = '913a3fe8-86df-437a-90ae-7911518e1fcb'
        taskAPI.deleteTask(todolistId,taskId)
            .then((res)=>{
                setState(res.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state,setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'c2499e20-080d-4ead-b829-1e7a44bb389f'
        let taskId = '307c42d1-0013-4ba3-ab3d-aa4e7ba7989a'
        let title = 'Привет'
        // let model:UpdateTaskModelType = {
        //     title: '',
        //     description: '',
        //     status: 0,
        //     priority: 0,
        //     startDate: '',
        //     deadline: '',
        // }
        taskAPI.updateTask(todolistId,taskId,title)
            .then((res)=>{
                setState(res.data.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}


