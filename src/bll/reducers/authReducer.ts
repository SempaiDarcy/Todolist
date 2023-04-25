import {LoginPayloadType} from "../../common/types/types";
import {Dispatch} from "redux";
import {authAPI} from "../../api/authAPI";
import {ResponseResulCode} from "../../common/constants/instanceAPI";
import {AppAT, setAppStatusAC, setInitializedAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/errorUtils";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthAT): InitialStateType => {
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
export const loginTC = (payload: LoginPayloadType) => async (dispatch: Dispatch<AuthAT>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(payload)
        if (res.data.resultCode === ResponseResulCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        //@ts-ignore
        handleServerNetworkError(error, dispatch)
    }
}

export const meTC = () => (dispatch: Dispatch<AuthAT>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setInitializedAC(false))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === ResponseResulCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
        .finally(() => dispatch(setInitializedAC(true)))
}

export const logoutTC = () => (dispatch: Dispatch<AuthAT>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResponseResulCode.OK) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type AuthAT = ReturnType<typeof setIsLoggedInAC> | AppAT