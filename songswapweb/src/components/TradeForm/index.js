import React from 'react'; 
import { Card, TextField, Button } from '@material-ui/core';


export default function TradeForm (props) {
    return (
        <form onSubmit={e => props.submitFunction(e)}> 
            <TextField 
                variant="outlined"
                margin="normal"
                required
                label="Name"
                type="text" 
                name="tradeName" 
                placeholder="name"
            />
            <TextField 
                variant="outlined"
                margin="normal"
                required
                label="Artist"
                type="text" 
                name="tradeArtist" 
                placeholder="artist"
            />
           
            <Button type='submit' variant='contained' color='primary'>Swap!</Button>
        </form>
    )
}