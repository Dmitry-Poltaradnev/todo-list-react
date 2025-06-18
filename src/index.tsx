import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import 'react-loading-skeleton/dist/skeleton.css';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import store from "./store";
import {ThemeWrapper} from "./components/ThemeWrapper";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeWrapper>
                <App/>
            </ThemeWrapper>
        </Provider>
    </BrowserRouter>
);

