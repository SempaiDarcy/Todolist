import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./reducers/todolistsReducer";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk"
import {appReducer} from "./reducers/appReducer";
import {authReducer} from "./reducers/authReducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>