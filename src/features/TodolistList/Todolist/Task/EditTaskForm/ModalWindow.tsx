import React, {FC} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useAppDispatch} from "../../../../../common/hooks/hooks";
import {updateTaskTC} from "../../../../../bll/reducers/tasksReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../../../common/types/types";
import {SubmitHandler, useForm} from "react-hook-form";


interface IEditTaskForm {
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type EditTaskFormPropsType = {
    task: TaskType
    show: boolean
    onClose: () => void
}
export const EditTaskForm: FC<EditTaskFormPropsType> = ({task, show, onClose}) => {

    // const newDate = dayjs(event.currentTarget.value).format().slice(0, -6)
    const dispatch = useAppDispatch()
    const {register, handleSubmit} = useForm<IEditTaskForm>({
        defaultValues: {
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        },

    });
    const onSubmit: SubmitHandler<IEditTaskForm> = (data) => {
        dispatch(updateTaskTC(task.todoListId, task.id, {...data}))
        onClose()
    }

    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editing task {task.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/*description*/}
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            placeholder="Enter description"
                            {...register("description")}/>

                    </Form.Group>

                    {/*statuses*/}
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select {...register("status")}>
                            <option value={TaskStatuses.New}>New</option>
                            <option value={TaskStatuses.InProgress}>In progress</option>
                            <option value={TaskStatuses.Completed}>Completed</option>
                            <option value={TaskStatuses.Draft}>Draft</option>
                        </Form.Select>
                    </Form.Group>

                    {/*priorities*/}
                    <Form.Group>
                        <Form.Label>Priority</Form.Label>
                        <Form.Select {...register("priority")}>
                            <option value={TaskPriorities.Low}>Low</option>
                            <option value={TaskPriorities.Middle}>Middle</option>
                            <option value={TaskPriorities.Hi}>Hi</option>
                            <option value={TaskPriorities.Later}>Later</option>
                            <option value={TaskPriorities.Urgently}>Urgently</option>
                        </Form.Select>
                    </Form.Group>

                    {/*start date*/}
                    <Form.Group>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date" {...register("startDate")}/>
                    </Form.Group>

                    {/*deadline*/}
                    <Form.Group>
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type="date" {...register("deadline")}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
