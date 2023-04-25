import React, {ChangeEvent, KeyboardEvent, FC, useState, memo} from "react";
import {Button, Form} from "react-bootstrap";

type InputPropsType = {
    label: string
    withButton?: boolean
    addItem: (title: string) => void
}
/**
 * Creates a new input component
 *
 * params:
 *
 * label: string - required - plaseholder text
 *
 * addItem: ( arg: string ) => void - required - add value function
 *
 * withButton: boolean - draw input with button
 *
 */
export const Input: FC<InputPropsType> = memo(({
                                                   label,
                                                   withButton,
                                                   addItem
                                               }) => {
    const [value, setValue] = useState<string>("")
    const [isError, setIsError] = useState<string>("")

    const addItemHandler = (): void => {
        if (value.trim() !== "") {
            addItem(value.trim());
            setValue("");
        } else {
            setIsError("Incorrect value")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setIsError("")
        if (event.key === "Enter") {
            addItemHandler();
            setValue("");
        }
    }

    return (
        <>
            <Form.Control type="text"
                          size="sm"
                          as="input"
                          value={value}
                          placeholder={label}
                          onChange={onChangeHandler}
                          onBlur={() => setIsError("")}
                          onKeyDown={onKeyPressHandler}
            />
            {
                isError
                && <Form.Text muted>
                    {isError}
                </Form.Text>
            }
            {
                withButton
                && <Button variant="primary"
                           size="sm"
                           onClick={addItemHandler}>
                    Add
                </Button>
            }
        </>
    )
})