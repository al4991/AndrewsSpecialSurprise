import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from '@material-ui/core';

import LoginForm from '../LoginForm'; 
// import CreateAccountForm from '../CreateAccountForm';

function CreateAccountForm(props) { 
    return ( 
        <div> 
             <Typography component="h1" variant="h5">
                Create Account
            </Typography>
            <form onSubmit={e => props.submitFunction(e)}>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    label="Name"
                    type="text" 
                    name="createAccountName" 
                    placeholder="name"
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    label="Email"
                    type="email" 
                    name="createAccountEmail" 
                    placeholder="email"
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    label="Password"
                    type="password" 
                    name="createAccountPassword" 
                    placeholder="password"
                />

                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Create Account
                </Button>
            </form> 
        </div>
    );
}

const styles = {
    mainContainer: {
        backgroundColor: '#21D4FD',
        backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
        width: '100vw', 
        height: '100vh', 
        position: 'absolute', 
        top: 0, 
        left:0, 
        right:0, 
        bottom:0, 
        textAlign: 'center', 
        color: '#f0f4ff',
        overflow: 'auto', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    formContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        height: '40vh', 
        width: '40vh', 
        padding: 40, 
    }
} 

export default class Auth extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            email: '', 
            password: '',
            newUser: false
        }
    }

    onChangeEmail(text) {
        this.setState({email: text})
    }

    onChangePassword(text) {
        this.setState({password: text})
    }

    onChangeName(text) {
        this.setState({name: text})
    }

    toggleNewUser() {
        this.setState({newUser: !this.state.newUser})
    }

    render() { 
        return (
            <div style={styles.mainContainer}> 
                <Card style={styles.formContainer}>
                    {
                        this.state.newUser ? 
                        <CreateAccountForm submitFunction={this.props.signupFunction}/>  : 
                        <LoginForm submitFunction={this.props.loginFunction}/> 
                    }
                    
                    <div onClick={() => this.toggleNewUser()}> 
                        <Button
                            variant="outlined"
                            style={{marginTop:20}}
                        > 
                            or {this.state.newUser ? 'Log in' : 'Sign up'}
                        </Button>
                    </div>
                </Card> 
                
            </div>)
    }

}