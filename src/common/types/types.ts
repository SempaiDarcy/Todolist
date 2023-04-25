import {TodolistsAT} from "../../bll/reducers/todolistsReducer";
import {TasksAT} from "../../bll/reducers/tasksReducer";
import {AppAT} from "../../bll/reducers/appReducer";
import {AuthAT} from "../../bll/reducers/authReducer";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodolistAppType = TodolistType & {
    filter : FilterType
    entityStatus: RequestStatusType
}

export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type TaskAppType = {
    [key: string] : TaskType[]
}

export type UpdateTaskType = {
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
export type FilterType = "all" | "active" | "completed"
export type ActionsAppType = TodolistsAT | TasksAT | AuthAT | AppAT
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}