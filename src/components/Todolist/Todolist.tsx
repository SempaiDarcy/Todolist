import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    updateTask:(todolistId:string,taskId:string,newTitle:string)=>void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (id: string) => void
    updateTodolist:(todolistId:string, newTitle:string)=>void
    filter: FilterValuesType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter(props.id, "All");
    const onActiveClickHandler = () => props.changeFilter(props.id, "Active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "Completed");

    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }
    const updateTodolistHandler = (newTitle:string) => {
        props.updateTodolist(props.id,newTitle)
    }
    const updateTaskHandler = (taskId:string,newTitle:string) => {
        props.updateTask(props.id,taskId,newTitle)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={updateTodolistHandler}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.id, t.id, newIsDoneValue);
                    }
                    // const updateTaskHandler = (newTitle:string) => {
                    //     props.updateTask(props.id,t.id,newTitle)
                    // }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} callBack={(newTitle:string)=>updateTaskHandler(t.id,newTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'All' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'Active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'Completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
};
