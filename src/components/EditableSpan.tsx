import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack:(newTitle:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [value,setValue] = useState(props.title)
    const editHandler = () => {
        setEdit(!edit)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const updateTaskHandler = () => {
        props.callBack(value)
        editHandler()
    }
    return (
        <>
            {edit
                ? <input autoFocus
                         onBlur={updateTaskHandler}
                         value={value}
                         onChange={onChangeHandler}/>
                : <span onDoubleClick={editHandler}>{props.title}</span>}
        </>
    );
};
