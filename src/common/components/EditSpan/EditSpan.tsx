import React, {FC, useState, KeyboardEvent, ChangeEvent, memo} from "react";
import { Form } from "react-bootstrap";

type EditSpanPropsType = {
    title: string
    onChangeText: (title: string) => void
}
export const EditSpan: FC<EditSpanPropsType> = memo(({title, onChangeText}) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>("")

    const onEditMode = (): void => {
        setText(title)
        setIsEditMode(true)
    }
    const offEditMode = (): void => {
        setIsEditMode(false)
        changeText()
    }
    const changeText = (): void => {
        if (text !== "") {
            onChangeText(text)
            setIsEditMode(false)
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (event.key === "Enter") {
            changeText()
            offEditMode()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setText(event.currentTarget.value)
    }
    return (
        <>
            {
                isEditMode ?
                    <Form.Control type="text"
                                  size="sm"
                                  as="input"
                                  style={{width: "100%"}}
                                  value={text}
                                  onChange={onChangeHandler}
                                  onBlur={offEditMode}
                                  onKeyPress={onKeyPressHandler}
                                  autoFocus
                    />

                    : <span onDoubleClick={onEditMode}> {title} </span>
            }
        </>
    )
})