import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import App from './App';
import {store} from "./store";


ReactDOM.render(
    <React.StrictMode>
        <App store={store}/>
    </React.StrictMode>,
    document.getElementById('root')
);

