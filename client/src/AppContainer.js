import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App.js'
import LoginPage from './components/general/LoginPage.js';
import SignupPage from './components/general/SignupPage.js';

const AppContainer = () => (
    <main className='container'>
        <Switch>
            <Route path='/main' component={App} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/' component={LoginPage} />


        </Switch>
    </main>
);


export default AppContainer