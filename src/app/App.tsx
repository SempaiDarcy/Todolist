import React, {useEffect} from "react";
import "./App.css";
import {AppRoutes} from "./AppRoutes/AppRoutes";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {RequestStatusType} from "../common/types/types";
import {meTC} from "../bll/reducers/authReducer";
import {ProgressBar, Spinner} from "react-bootstrap";
import {NavBar} from "../features/TodolistList/NavBar/NavBar";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Spinner animation="border" variant="primary"/>
        </div>
    }

    return (
        <div>
            <NavBar/>
            {status === 'loading' && <ProgressBar animated now={100}/>}
            <AppRoutes/>
        </div>
    );
}

export default App;
