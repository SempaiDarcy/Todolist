import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";

export type ButtonNameType = 'All' | 'Active' | 'Completed'
function App() {
    const title = 'What to learn';
    // const tasks = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 1, title: 'JS', isDone: true},
    //     {id: 1, title: 'ReactJS', isDone: false},
    // ]
    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])
    const removeTask = (id: number) => {
        tasks = tasks.filter(el => el.id !== id)
        setTasks(tasks)
    }

    return (
        <div className="App">
            <Todolist title={title} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
