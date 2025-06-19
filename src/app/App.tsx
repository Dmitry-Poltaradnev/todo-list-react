import s from './App.module.css'
import React from "react";
import {ErrorSnackBar} from "../common/components/ErrorSnackBar/ErrorSnackBar";
import {Header} from "../common/components/Header/Header";
import {Routing} from "../common/routing/Routing";

function App() {
    return (
        <div className={s.App}>
            <ErrorSnackBar/>
            <Header/>
            <Routing/>
        </div>
    )
}

export default App;