import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import {NavigationBar} from '../components/NavigationBar';
import "./App.css";

import Routes from '../Routes/Routes';

class App extends Component {

    render() {

        return (
            <div className="App container">
                <NavigationBar />
                <Routes/>
            </div>
        );
    }

}
export default withRouter(App);
