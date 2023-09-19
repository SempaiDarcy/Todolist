import axios from 'axios'


const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'cb518e47-d2d9-40b9-aefd-dfe61cc62153',
    },
})

export const todolistAPI = {
   getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
   },
    createTodolist() {
       return instance.post<CreateTodolistResponseType<{item: TodolistType}>>('todo-lists',{title:'REACT'})
    },
    deleteTodolist(todolistId:string) {
       return instance.delete<DeleteTodolistResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(title:string,todolistId:string) {
       return instance.put(`todo-lists/${todolistId}`,{title})
    }
}
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
type DeleteTodolistResponseType<T> = {
    resultCode: number
    messages: string[],
    data: T
}