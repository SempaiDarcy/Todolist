import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {ActionsAppType} from "../types/types";
import {AppRootStateType} from "../../bll/store";

export const useAppDispatch: () => ThunkDispatch<AppRootStateType, any, ActionsAppType> = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =  useSelector
