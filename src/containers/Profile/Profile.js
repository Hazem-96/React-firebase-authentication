/**
 * Created by hazem on 12/01/2018.
 */
import React, { Component} from 'react';
import {Image, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import './profile.css';
import { auth, database } from '../../Firebase/firebase';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            photo: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', //initiallizing with Anonymous Avatar
            BD: '',
            address: '',
            user: null

        };
    }
    componentDidMount() {
        //verifying if there is an authenticated user
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user});
                if(user.photoURL){this.setState({photo: user.photoURL})}
                if(user.username){this.setState({username: user.username})}
        //getting user details from db
                database.ref('/users/' + user.uid ).once('value').then( snapshot => {
                    let user = snapshot.val() ;
                    if (user) {
                        this.setState({
                            BD: user.BD || '',
                            address: user.address,
                            username: user.username
                        });
                    }

                });
            }
        });

    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault(); // <- prevent form submit from reloading the page
        // Send the user details to Firebase database
        database.ref('users/' + this.state.user.uid).set({
            username: this.state.username,
            email: this.state.user.email,
            BD : this.state.BD,
            address: this.state.address
        });
        //State Reinitialisation
        this.setState({
            username: '',
            photo: '',
            BD: null,
            address: '',
            user: null,
            profile: null
        });
        //redirect to home after saving details to db
        this.props.history.push("/");

    }


    render() {
        return(
            <div className="mid">
                {this.state.user?
                    <div>
                     <h2>Your Profile</h2>

                                    <Image src={this.state.photo} alt="profile_image" thumbnail></Image>
                                   <p className="desc">
                                    Name: {this.state.username}<br/>
                                    email: {this.state.user.email}<br/>
                                    Birthday: {this.state.BD}<br/>
                                    address: {this.state.address}<br/>
                                    Verification :{this.state.user.emailVerified?'Verified':'unverified'}<br/>
                                   </p>
                        <h3>Edit Profile</h3>
                        <form onSubmit={this.handleSubmit}>

                            <FormGroup controlId="username" >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl

                                    type="text"
                                    placeholder = {this.state.username}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="BD" >
                            <ControlLabel>Birth date</ControlLabel>
                            <FormControl

                                type="date"
                                value={this.state.BD}
                                onChange={this.handleChange}
                            />
                            </FormGroup>
                            <FormGroup controlId="address" >
                            <ControlLabel>Address</ControlLabel>
                            <FormControl

                                type="text"
                                value={this.state.address}
                                onChange={this.handleChange}
                            />
                            </FormGroup>
                            <Button
                                block
                                type="submit"
                                >
                                Save changes
                            </Button>
                        </form>
                     </div>
                    :<em>Sign In to access the profile section</em>

                }



            </div>
            )
    }
}

