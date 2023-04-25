import React, {FC, memo, useCallback, useEffect} from "react";
import {FilterType, TaskStatuses, TaskType, TodolistAppType} from "../../../common/types/types";
import {Button, Card} from "react-bootstrap";
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {Task} from "./Task/Task";
import {addTaskTC, setTasksTC} from "../../../bll/reducers/tasksReducer";
import s from "./Todolist.module.css"
import {changeTodolistTitleTC, deleteTodolictsTC} from "../../../bll/reducers/todolistsReducer";
import {EditSpan} from "../../../common/components/EditSpan/EditSpan";
import {Input} from "../../../common/components/Input/Input";

type TodolistType = {
    todolist: TodolistAppType
    changeTodolistFilter: (todolistID: string, filter: FilterType) => void
}
export const Todolist: FC<TodolistType> = memo(({
                                                    todolist,
                                                    changeTodolistFilter
                                                }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setTasksTC(todolist.id))
    }, [todolist.id, dispatch])

    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todolist.id])
    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    const deleteTodolist = (): void => {
        dispatch(deleteTodolictsTC(todolist.id))
    }
    const changeTodolistTitle = useCallback((title: string): void => {
        dispatch(changeTodolistTitleTC(todolist.id, title))
    }, [dispatch, todolist.id])
    const addTask = useCallback((title: string): void => {
        dispatch(addTaskTC(todolist.id, title))
    }, [dispatch, todolist.id])

    const onAllClickHandler = useCallback(() => changeTodolistFilter(todolist.id, "all"), [todolist.id, changeTodolistFilter])
    const onActiveClickHandler = useCallback(() => changeTodolistFilter(todolist.id, "active"), [todolist.id, changeTodolistFilter])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilter(todolist.id, "completed"), [todolist.id, changeTodolistFilter])

    return (
        <div className={s.container}>
            <Card style={{width: "100%"}}>
                <Card.Header style={{textAlign: "right"}}>
                    <RiDeleteBin6Line onClick={deleteTodolist} className={s.deleteButton}/>
                    <Card.Title style={{textAlign: "left"}}>
                        <EditSpan title={todolist.title} onChangeText={changeTodolistTitle}/>
                    </Card.Title>
                </Card.Header>
                <Input label="Add task" addItem={addTask} withButton={true}/>
                <Card.Body>
                    {
                        tasks.map(elem => <Task task={elem}
                                                key={elem.id}
                        />)
                    }

                </Card.Body>
                <Card.Footer className={s.cardFooter}>
                    <Button variant="outline-primary"
                            size="sm"
                            onClick={onAllClickHandler}>
                        all
                    </Button>
                    <Button variant="outline-primary"
                            size="sm"
                            onClick={onActiveClickHandler}>
                        active
                    </Button>
                    <Button variant="outline-primary"
                            size="sm"
                            onClick={onCompletedClickHandler}>
                        completed
                    </Button>
                </Card.Footer>
            </Card>

        </div>
    )
})