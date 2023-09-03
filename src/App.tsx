import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoId: string]: TaskType[]

}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Coffee', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cola', isDone: false},
        ]
    })

    const addTask = (todoId: string, title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todoId:
        let todolistTasks = tasks[todoId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todoId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    const removeTask = (todoId: string, id: string) => {
        //достанем нужный массив по todoId:
        let todolistTasks = tasks[todoId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todoId] = todolistTasks.filter(t => t.id !== id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeTaskStatus(todoId: string, taskId: string, isDone: boolean) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todoId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
        // const updatedTasks = tasks[todoId].map(el=>el.id===taskId?{...el, isDone: isDone}:el)
        //   tasks[todoId] = updatedTasks;
        // setTasks({...tasks})
    }

    const changeFilter = (todoId: string, filter: FilterValuesType) => {
        let todolist = todolists.find(tl => tl.id === todoId);
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    const addTodolist = (title: string) => {
        let todolistId = v1()
        let newTodolist: TodolistType = {id: todolistId, title, filter: 'All'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todoId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todoId]: tasks[todoId].map(el =>
                el.id === taskId
                    ? {...el,title:newTitle}
                    : {...el}
            )
        })
    }
    const updateTodolist = (todoId:string,newTitle:string) => {
        setTodolists([...todolists.map(el=>
            el.id===todoId
                ? {...el,title:newTitle}
                : {...el}
        )])
    }
    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "Active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "Completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        updateTask={updateTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTodolist={updateTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
