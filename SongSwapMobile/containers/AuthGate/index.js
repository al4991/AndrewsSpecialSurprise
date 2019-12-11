import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import AppContainer from '../../components/AppContainer';
import Auth from '../Auth';

class AuthGate extends Component{ 
    render(){
        if (this.props.loggedin) { 
            return( <AppContainer /> )
        }
        else {
            return ( <Auth /> )
        }
    }
}



const mapStateToProps = (state) => { 
    const { user, loggedin } = state; 
    return { user, loggedin }; 
}

const mapDispatchToProps  = (dispatch) => (
    bindActionCreators({}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AuthGate);
