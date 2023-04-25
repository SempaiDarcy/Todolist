import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../features/Login/Login";
import {TodolistList} from "../../features/TodolistList/TodolistList";

export const AppRoutes:FC = () => {
    return (
        <Routes>
            <Route path='/' element={<TodolistList/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
            <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
        </Routes>
    )
}