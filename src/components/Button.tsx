import React from 'react';
import {FilterValuesType} from "../App";
type ButtonPropsType = {
    name:FilterValuesType
    callBack:(filter:FilterValuesType) => void
}
const Button = (props:ButtonPropsType) => {
    return (
        <button onClick={()=>props.callBack(props.name)}>{props.name}</button>
    );
};

export default Button;