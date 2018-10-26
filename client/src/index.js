import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store.js'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import AppContainer from './AppContainer.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store}>
        <Router>
        <AppContainer />
        </Router>
    </Provider>,
    document.getElementById('root'))
    ;
registerServiceWorker();
