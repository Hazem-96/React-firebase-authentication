/**
 * Created by hazem on 11/01/2018.
 */

import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import  { auth }  from '../../Firebase/firebase';
import "./Register.css";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password2: "",
            error: null
        };
    }
    getValidationState() {
        let password = this.state.password;
        let password2 = this.state.password2;
        if ( password === password2 && password.length >= 6 ) return 'success';
        else if ( password !== password2 && password2.length > 0) return 'error';
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 6 && this.state.password2.length > 6  && this.state.password === this.state.password2;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
            user.sendEmailVerification();
            this.props.history.push("/");
        })
            .catch(err =>{
                this.setState({error: err});
            }
            );

    };

    render() {
        return (
            <div className="mid">
                {this.state.error &&
                    <Alert bsStyle="danger">
                        {this.state.error.message}
                    </Alert>
                }
                <form onSubmit={this.handleSubmit} >

                    <FormGroup controlId="email" >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="password2" validationState={this.getValidationState()}>
                        <ControlLabel>Retype Password</ControlLabel>
                        <FormControl
                            value={this.state.password2}
                            onChange={this.handleChange}
                            type="password"
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
                <p><em>you already have an account ? <a href="/login">Log in</a> </em></p>

            </div>
        );
    }
}