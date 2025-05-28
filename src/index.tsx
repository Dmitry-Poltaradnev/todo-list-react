import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import 'react-loading-skeleton/dist/skeleton.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);

