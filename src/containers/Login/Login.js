/**
 * Created by hazem on 11/01/2018.
 */
import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, ButtonToolbar, Alert } from "react-bootstrap";
import  { auth, provider } from '../../Firebase/firebase.js';

import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            user: null,
            error: null
        };
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(user => {this.setState(user);this.props.history.push("/")})
            .catch( err => {
            this.setState({
                error: err
            }) ;

        });

    }
    loginWithGoogle () {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
                this.props.history.push("/");
            });
    }
    render() {
        return (
            <div className="mid">
                {this.state.error &&
                <Alert bsStyle="danger">
                    {this.state.error.message}
                </Alert>
                }
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="medium">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="medium">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block

                        bsSize="medium"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                    <p><em>you don't have an account ? <a href="/register">Sign up</a> </em></p>
                    <p><strong>-- Or --</strong></p>

                </form>
                <ButtonToolbar>
                <Button
                    block
                    bsStyle="primary"
                    type="button"
                    onClick={this.loginWithGoogle}
                >
                    Login with Google Account
                </Button>
                </ButtonToolbar>
            </div>
        );
    }
}