import React from 'react'; 
import { TextField,  } from '@material-ui/core';


function CreateAccountForm(props) { 
    return ( 
        <div> 
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
                <label htmlFor="createAccountEmail">Email</label>
                <TextField type="email" name="createAccountEmail" placeholder="email"/>
                <label htmlFor="createAccountPassword">Password</label>
                <TextField type="password" name="createAccountPassword" placeholder="password"/>
                <button>Create Account</button>
            </form> 
        </div>
    );
}

export default CreateAccountForm; 