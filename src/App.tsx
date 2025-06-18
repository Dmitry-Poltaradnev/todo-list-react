import './App.css';
import React from "react";
import {ErrorSnackBar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {Header} from "./components/Header/Header";
import {Routing} from "./common/routing/Routing";

function App() {
    return (
        <div className='App'>
            <ErrorSnackBar/>
            <Header/>
            <Routing/>
        </div>
    )
}

export default App;