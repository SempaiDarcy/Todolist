import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT
export const todolistsReducer = (state: TodolistType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todoID)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.todoId ? {...el, title: action.newTodolistTitle} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.todoId ? {...el, filter: action.newFilter} : el)
        }
        default:
            return state
    }
}
type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type AddTodolistAT = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistAC>
type ChangeFilterAT = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todoID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoID
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        todolistId: v1(),
        title
    } as const
}

const changeTodolistAC = (todoId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoId,
        newTodolistTitle
    } as const
}

const changeFilterAC = (todoId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoId,
        newFilter
    } as const
}