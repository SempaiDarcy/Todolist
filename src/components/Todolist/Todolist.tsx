import React, {useState} from 'react';
import {ButtonNameType} from "../../App";

type PropsType = {
    title: string
    tasks: TaskType[];
    removeTask: (id: number) => void
}
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const [filteredButtonName, setButtonName] = useState('All')
    const filterTasks = (buttonName:ButtonNameType) => {
        setButtonName(buttonName)
    }
    const filteredTasks = () => {
        // if (filteredButtonName==='Active') {
        //     filterTask = props.tasks.filter(el=>!el.isDone)
        // }
        // if (filteredButtonName==='Completed') {
        //     filterTask = props.tasks.filter(el=>el.isDone)
        // }
        switch (filteredButtonName){
            case 'Active': {
                return props.tasks.filter(el=>!el.isDone)
            }
            case 'Completed': {
                return props.tasks.filter(el=>el.isDone)
            }
            default: return props.tasks
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredTasks().map((el) => {
                    return <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={() => {
                        }}/>
                        <span>{el.title}</span>
                        <button onClick={() => props.removeTask(el.id)}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={()=>filterTasks('All')}>All</button>
                <button onClick={()=>filterTasks('Active')}>Active</button>
                <button onClick={()=>filterTasks('Completed')}>Completed</button>
            </div>
        </div>
    );
};
