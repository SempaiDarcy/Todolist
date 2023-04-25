import {useAppDispatch} from "../../../../../common/hooks/hooks";
import {deleteTaskTC, updateTaskTC} from "../../../../../bll/reducers/tasksReducer";
import {useMemo} from "react";
import {TaskStatuses, TaskType} from "../../../../../common/types/types";

export const useTaskLogic = (task: TaskType) => {
    const dispatch = useAppDispatch()
    const deleteTask = (): void => {
        dispatch(deleteTaskTC(task.todoListId, task.id))
    }
    const updateTaskTitle = (title: string): void => {
        dispatch(updateTaskTC(task.todoListId, task.id, {title}))
    }

    const statusColor = useMemo(() => {
        switch (task.status) {
            case TaskStatuses.Completed:
                return "#e8f5e9"
            case TaskStatuses.New:
                return "#e3f2fd"
            case TaskStatuses.InProgress:
                return "#fff8e1"
            case TaskStatuses.Draft:
                return "#ffebee"
            default:
                return "#eceff1"
        }
    }, [task])
    const statusBadgeColor = useMemo(() => {
        switch (task.status) {
            case TaskStatuses.Completed:
                return "success"
            case TaskStatuses.New:
                return "primary"
            case TaskStatuses.InProgress:
                return "warning"
            case TaskStatuses.Draft:
                return "danger"
            default:
                return "secondary"
        }
    }, [task])

    const taskStatusText = useMemo(() => {
        switch (task.status) {
            case TaskStatuses.Completed:
                return "completed"
            case TaskStatuses.New:
                return "new"
            case TaskStatuses.InProgress:
                return "...in progress"
            case TaskStatuses.Draft:
                return "draft"
            default:
                return ""
        }
    }, [task])

    return {deleteTask, updateTaskTitle, statusColor, taskStatusText, statusBadgeColor}
}