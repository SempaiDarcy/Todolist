import React, {FC} from "react";
import {Todolist} from "./Todolist/Todolist";
import {Input} from "../../common/components/Input/Input";
import {useTodolists} from "../../app/hooks/useTodolists";


export const TodolistList: FC = () => {
    const {todolists, addTodolist, changeTodolistFilter} = useTodolists()

    return (
        <div>
            <header className="AppHeader">
                <Input label="Add todolist" addItem={addTodolist}/>
            </header>
            <div className="App">

                {
                    todolists.map(elem => <Todolist todolist={elem}
                                                    changeTodolistFilter={changeTodolistFilter}
                                                    key={elem.id}
                    />)
                }
            </div>
        </div>
    )
}