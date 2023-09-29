import {Dispatch} from 'redux'
import {
    SetAppErrorActionType,
    setAppIsInitializedAC, SetAppIsInitializedAT,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {LoginDataType} from "./Login";
import {clearDataAC, ClearDataActionType} from "../TodolistsList/todolists-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks

// export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const result = await authAPI.login(data)
//         if(result.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         }
//         else  {
//             handleServerAppError(result.data,dispatch)
//         }
//     }
//     catch (e) {
//         handleServerNetworkError((e as {message:string}),dispatch)
//     }
// }

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then((result) => {
            if (result.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(result.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError((e as { message: string }), dispatch);
        });
};

export const meTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError((e as { message: string }), dispatch);
        })
        .finally(()=>{
            dispatch(setAppIsInitializedAC(true))
        })
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(clearDataAC())
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError((e as { message: string }), dispatch);
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>  | SetAppStatusActionType | SetAppErrorActionType | SetAppIsInitializedAT | ClearDataActionType
