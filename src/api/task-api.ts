import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'cb518e47-d2d9-40b9-aefd-dfe61cc62153',
    }
})
export const taskAPI = {
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId:string, taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    // updateTask(todolistId:string,taskId:string, model:UpdateTaskModelType) {
    //     return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,{model})
    // }
    updateTask(todolistId:string,taskId:string, title:string) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,{title})
    }
}
type GetTasksResponse = {
    items: TaskType[],
    totalCount:number,
    error:string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status:TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline:string
    id: string
    todoListId: string
    order: number
    addedDate: string
}