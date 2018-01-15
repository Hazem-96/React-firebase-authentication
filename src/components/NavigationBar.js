/**
 * Created by hazem on 14/01/2018.
 */
import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { Link} from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { auth } from '../Firebase/firebase.js';


export class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            user: null
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            }
        });
    }
    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });


    }



    render(){
        return (
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>


                    {this.state.user ?
                        <Nav pullRight>
                            <NavDropdown title={this.state.user.displayName?this.state.user.displayName:this.state.user.email}>
                                <MenuItem href="/profile">Profile</MenuItem>
                                <MenuItem onClick={this.logout}>Log out</MenuItem>
                            </NavDropdown>
                        </Nav>
                        :<Nav pullRight><NavItem href="/register" >Register</NavItem>
                            <NavItem href="/login">Login</NavItem></Nav>
                    }

                </Navbar.Collapse>
            </Navbar>

        )
    }
}

