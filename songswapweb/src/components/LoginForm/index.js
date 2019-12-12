import React from 'react'; 
import { TextField, Typography, Button } from '@material-ui/core';

export default function LoginForm(props) { 
    return ( 
        <div style={ { 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-evenly', 
            alignItems: 'center',
            height: '40vh', 
            width: '40vh', 
            padding: 40
        }}>              
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form onSubmit={e => props.submitFunction(e)}>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    label="Email"
                    type="email" 
                    name="loginEmail" 
                    placeholder="email"
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    label="Password"
                    type="password" 
                    name="loginPassword" 
                    placeholder="password"
                />

                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Login
                </Button>
            </form> 
        </div>
    )
}