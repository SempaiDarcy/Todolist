import {ActionsAppType, FilterType, RequestStatusType, TodolistAppType, TodolistType} from "../../common/types/types";
import {todolistAPI} from "../../api/todolistAPI";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../../common/utils/errorUtils";



export type TodolistsAT = AddTodolistAT | RemoveTodolistAT
    | ChangeTodolistTitleAT | ChangeTodolistFilterAT | SetTodolistsAT | ReturnType<typeof changeTodolistEntityStatusAC>

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

const init_state: TodolistAppType[] = []

export function todolistsReducer  (state = init_state, action: TodolistsAT): TodolistAppType[] {
    switch (action.type) {
        case "ADD_TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        case "REMOVE_TODOLIST":
            return state.filter(elem => elem.id !== action.id)
        case "CHANGE_TODOLIST_TITLE":
            return state.map(elem => elem.id === action.id
                ? {...elem, title: action.title}
                : elem
            )
        case "CHANGE_TODOLIST_FILTER":
            return state.map(elem => elem.id === action.id
                ? {...elem, filter: action.filter}
                : elem
            )
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case "SET_TODOLISTS":
            return action.todolists.map(elem => ({...elem, filter: "all", entityStatus: 'idle'}))
        default:
            return state
    }
}
//action creators
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD_TODOLIST", todolist} as const
}
export const removeTodolistAC = (todolistID: string) => {
    return {type: "REMOVE_TODOLIST", id: todolistID} as const
}
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {type: "CHANGE_TODOLIST_TITLE", id: todolistID, title} as const
}
export const changeTodolistFilterAC = (todolistID: string, filter: FilterType) => {
    return {type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "SET_TODOLISTS", todolists} as const
}
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)

//thunk creators
export const getTodolictsTC = () => (dispatch: Dispatch<ActionsAppType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
}
export const deleteTodolictsTC = (todolistID: string) => (dispatch: Dispatch<ActionsAppType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistID, 'loading'))
    todolistAPI.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsAppType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch<TodolistsAT>) => {
    todolistAPI.updateTodolistTitle(todolistID, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistID, title))
        })
}