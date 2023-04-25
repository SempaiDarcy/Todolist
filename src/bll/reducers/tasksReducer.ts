import {TaskAppType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType} from "../../common/types/types";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolistsReducer";
import {todolistAPI} from "../../api/todolistAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksAT = RemoveTaskAT | AddTaskAT
    | AddTodolistAT | RemoveTodolistAT
    | SetTodolistsAT | SetTasksAT | UpdateTaskAT

//action types
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type SetTasksAT = ReturnType<typeof setTasksAC>
type UpdateTaskAT = ReturnType<typeof updateTaskAC>


const initState: TaskAppType = {}

export const tasksReducer = (state = initState, action: TasksAT): TaskAppType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case "ADD_TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "ADD_TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE_TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET_TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((elem) => {
                stateCopy[elem.id] = []
            })
            return stateCopy
        }
        case "SET_TASKS": {
            return {...state, [action.todolistID]: action.tasks}
        }
        case "UPDATE_TASK": {
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(elem => elem.id === action.task.id
                    ? {...action.task}
                    : elem)
            }
        }
        default:
            return state
    }
}

//action creators
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: "REMOVE_TASK", taskID, todolistID} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD_TASK", task} as const
}
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {type: "SET_TASKS", todolistID, tasks} as const
}
export const updateTaskAC = (task: TaskType) => {
    return {type: "UPDATE_TASK", task} as const
}

//thunk creators
export const setTasksTC = (todolistID: string) => (dispatch: Dispatch<TasksAT>) => {
    todolistAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(todolistID, res.data.items))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<TasksAT>) => {
    todolistAPI.createTask(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<TasksAT>) => {
    todolistAPI.deleteTask(todolistID, taskID)
        .then((res) => {
            if (res.data.resultCode === 0)
                dispatch(removeTaskAC(taskID, todolistID))
        })
}
export const updateTaskTC = (todolistID: string, taskID: string, updateTaskModel: UpdateTaskModelType) =>
    (dispatch: Dispatch<TasksAT>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistID].find(elem => elem.id === taskID)
        if (task) {
            const model: UpdateTaskType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...updateTaskModel
            }
            todolistAPI.updateTask(todolistID, taskID, model)
                .then((res) => {
                    if (res.data.resultCode === 0)
                        // dispatch(changeTaskTitleAC(todolistID, taskID, title))
                        dispatch(updateTaskAC(res.data.data.item))
                })
        } else {
            console.warn("Task not found in the state!!!")
            return
        }
    }
