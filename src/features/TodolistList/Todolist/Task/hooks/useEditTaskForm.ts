import {useCallback, useState} from "react";

export const useEditTaskForm = () => {
    const [show, setShow] = useState<boolean>(false);
    const onClose = useCallback(() => setShow(false), [])
    const onOpen = () => setShow(true);

    return {show, onClose, onOpen}
}