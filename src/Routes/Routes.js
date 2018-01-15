import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home/Home';
import Login from '../containers/Login/Login';
import Register from '../containers/SignUp/Register';
import Profile from '../containers/Profile/Profile';


export default () =>
    <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/profile' exact component={Profile}/>
    </Switch>;