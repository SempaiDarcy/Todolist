import {TasksStateType} from "../App";
import {v1} from "uuid";

export type ActionsType =
    RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT
export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todoId]: state[action.todoId].filter(el => el.id !== action.id)}
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todoId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.id ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete copyState[action.todoID]
            // return copyState
            //or
            const {[action.todoID]:[],...rest} = state
            return rest
        }
        default:
            return state
    }
}
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type AddTodolistAT = ReturnType<typeof addTodolistAC>
type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export const removeTaskAC = (todoId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        todoId,
        id
    } as const
}

export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todoId,
        title
    } as const
}
export const changeTaskStatusAC = (todoId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoId,
        id,
        isDone
    } as const
}
export const changeTaskTitleAC = (todoId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoId,
        id,
        newTitle
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        todolistId: v1(),
        title
    } as const
}
export const removeTodolistAC = (todoID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoID
    } as const
}

