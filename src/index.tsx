import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root'));

