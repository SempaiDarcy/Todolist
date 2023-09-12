import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolistsReducer} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: TodolistType[]
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})
test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', todoID: todolistId2})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)
})
test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', todolistId: v1(), title: 'Hello'})
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('Hello')
})
test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, {
        type: 'CHANGE-TODOLIST-TITLE',
        todoId: todolistId2,
        newTodolistTitle: 'hello'
    })
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('hello')
})
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'
    const endState = todolistsReducer(startState,
        {
            type: 'CHANGE-TODOLIST-FILTER',
            todoId: todolistId2,
            newFilter: newFilter
        })

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
