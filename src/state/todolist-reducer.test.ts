import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolistsReducer} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', todoID: todolistId2})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: 'Hello'})
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('Hello')
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, {type: 'CHANGE-TODOLIST-TITLE', todoId: todolistId2, newTodolistTitle: 'hello'})
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('hello')
})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     todoId: todolistId2,
    //     newFilter: newFilter
    // }

    const endState = todolistsReducer(startState,
        {
            type: 'CHANGE-TODOLIST-FILTER',
            todoId: todolistId2,
            newFilter: newFilter
        })

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
