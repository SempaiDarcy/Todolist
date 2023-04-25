import React, {FC} from "react";
import {TaskType} from "../../../../common/types/types";
import {Badge, Card} from "react-bootstrap";
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line";
import s from "./Task.module.css"
import {EditSpan} from "../../../../common/components/EditSpan/EditSpan";
import dayjs from "dayjs";
import {RiEditLine} from "@react-icons/all-files/ri/RiEditLine";
import {EditTaskForm} from "./EditTaskForm/ModalWindow";
import {useEditTaskForm} from "./hooks/useEditTaskForm";
import {useTaskLogic} from "./hooks/useTaskLogic";


type TaskPropsType = {
    task: TaskType
}
export const Task: FC<TaskPropsType> = ({
                                            task
                                        }) => {

    const {show, onClose, onOpen} = useEditTaskForm()
    const {deleteTask, updateTaskTitle, statusColor, taskStatusText, statusBadgeColor} = useTaskLogic(task)

    return (
        <>
            <Card style={{margin: "5px 0", background: statusColor}}>
                <Card.Body>
                    <div style={{justifyContent: "flex-end", display: "flex"}}>
                        <Badge bg={statusBadgeColor}>{taskStatusText}</Badge>
                    </div>

                    <Card.Title>
                        <EditSpan title={task.title} onChangeText={updateTaskTitle}/>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <span className={s.addedDate}>
                        Created:
                            {dayjs(task.addedDate).format("DD MMMM YYYY HH:mm:ss")}
                        </span>
                    </Card.Subtitle>
                    <Card.Text>
                        Description: {task.description ? task.description : "none"}
                    </Card.Text>
                    <RiDeleteBin6Line onClick={deleteTask} className={s.deleteButton}/>
                    <RiEditLine className={s.deleteButton} onClick={onOpen}/>
                </Card.Body>
            </Card>
            <EditTaskForm task={task} show={show} onClose={onClose}/>
        </>
    )
}