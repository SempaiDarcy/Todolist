import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    const title = 'What to learn';
    // const tasks = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 1, title: 'JS', isDone: true},
    //     {id: 1, title: 'ReactJS', isDone: false},
    // ]
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('All')

    let tasksForTodolist = tasks;

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([...tasks, newTask])
    }
    const removeTask = (id: string) => {
        let filteredTask = tasks.filter(el => el.id !== id)
        setTasks(filteredTask)
    }
    function changeTaskStatus(taskId:string, isDone:boolean) {
        let task = tasks.find(el=>el.id===taskId)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    return (
        <div className="App">
            <Todolist title={title} tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
