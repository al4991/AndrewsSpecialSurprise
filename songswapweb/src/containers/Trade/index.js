import React, { Component } from 'react'; 
import axios from 'axios'; 

import TradeForm from './../../components/TradeForm';

export default class Trade extends Component{ 
    constructor(props) { 
        super(props);
    }
    render() { 
        console.log('reached'); 
        return (
            <div> 
                <TradeForm /> 
            </div>
        )
    }

}
