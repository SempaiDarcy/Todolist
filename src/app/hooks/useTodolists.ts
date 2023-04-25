import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {useCallback, useEffect} from "react";
import {addTodolistTC, changeTodolistFilterAC, getTodolictsTC} from "../../bll/reducers/todolistsReducer";
import {FilterType} from "../../common/types/types";
import {useNavigate} from "react-router-dom";


export const useTodolists = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const todolists = useAppSelector(state => state.todolists)

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    !isLoggedIn && navigate('/login')

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodolictsTC())
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        dispatch(getTodolictsTC())
    }, [dispatch])

    const addTodolist = useCallback((title: string): void => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistID: string, filter: FilterType): void => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }, [dispatch])

    return {todolists, addTodolist, changeTodolistFilter}
}
