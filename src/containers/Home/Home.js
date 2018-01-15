/**
 * Created by hazem on 11/01/2018.
 */

import React, {Component} from "react";
import "./Home.css";

export default class Home extends Component {
    render () {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Landing Page</h1>
                    <p> A test Screen</p>
                </div>
                <br/>
                <hr/>
                <p id="footer"><em>Hazem @ReactApp</em></p>
            </div>
        );
    }
}