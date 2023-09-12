import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist:TodolistType
}

export function TodolistWithRedux({todolist}:PropsType) {
    const {id,title,filter} = todolist
    let tasks = useSelector<AppRootStateType,TaskType[]>((state)=>state.tasks[id])
    const dispatch = useDispatch()
    const addTask = (title: string) => {
        dispatch(addTaskAC(id,title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id,title))
    }

    const onAllClickHandler = () => dispatch(changeFilterAC(id,'all'))
        // props.changeFilter("all", props.id);
    const onActiveClickHandler = () => dispatch(changeFilterAC(id,'active'))
        // props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id,'completed'))
        // props.changeFilter("completed", props.id);
    if(todolist.filter==='active') {
        tasks = tasks.filter(el=>!el.isDone)
    }
    if(todolist.filter==='completed') {
        tasks = tasks.filter(el=>el.isDone)
    }
    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
               tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(id,t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(id,t.id,newIsDoneValue))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(id,t.id,newValue))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


