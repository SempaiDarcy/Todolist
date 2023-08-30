import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "../../App";
import Button from "../Button";
import s from './Todolist.module.css'

type PropsType = {
    title: string
    tasks: TaskType[];
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus:(taskId:string,isDone:boolean) => void
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string|null>(null)
    const addTaskHandler = () => {
            taskHandler()
    }
    const taskHandler = () => {
        if(value.trim()!==''){
            props.addTask(value);
            setValue('')
        }
        else {
            setError('Title is required!')
        }

    }
    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }
    // const changeFilterCompletedHandler = () => {
    //     props.changeFilter('Completed')
    // }
    // const changeFilterActiveHandler = () => {
    //     props.changeFilter('Active')
    // }
    // const changeFilterAllHandler = () => {
    //     props.changeFilter('All')
    // }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // props.addTask(value)
            // setValue('')
            taskHandler()
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                       onChange={onChangeHandler}
                       className={error?s.input_error:''}
                       onKeyPress={onKeyPressHandler}
                       // onChange={(e) => {
                       //     setValue(e.currentTarget.value)
                       // }}
                       // onKeyPress={(e) => {
                       //     if (e.key === 'Enter') {
                       //         addTask(value)
                       //         setValue('')
                       //     }
                />
                <button onClick={addTaskHandler}>+</button>
                {error&&<div className={s.error_message}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el) => {
                    // const removeTaskHandler = () => {
                    //     props.removeTask(el.id)
                    // }
                    const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id,e.currentTarget.checked)
                        console.log(e.currentTarget.checked)
                    }
                    return <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={
                            changeTaskStatusHandler
                            // props.changeTaskStatus(el.id,e.currentTarget.checked)
                            // console.log(e.currentTarget.checked)
                        }/>
                        <span>{el.title}</span>
                        <button onClick={() => removeTaskHandler(el.id)}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={changeFilterHandler}/>
                <Button name={'Active'} callBack={changeFilterHandler}/>
                <Button name={'Completed'} callBack={changeFilterHandler}/>
                {/*<button onClick={() => changeFilterHandler('All')}>All</button>*/}
                {/*<button onClick={() => changeFilterHandler('Active')}>Active</button>*/}
                {/*<button onClick={() => changeFilterHandler('Completed')}>Completed</button>*/}
            </div>
        </div>
    );
};
