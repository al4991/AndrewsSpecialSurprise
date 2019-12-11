import React, { Component } from 'react'; 
import { Card, TextInput, Title, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'; 

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userLogin, userSignup } from './../../duck/actions';

const styles = StyleSheet.create({
    cardActionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    titleStyle: {
        textAlign: 'center', 
    },
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignContent:'center',
        paddingTop: 300,
        paddingLeft: 40, 
        paddingRight: 40, 
     }
})

class Auth extends Component {
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

    onClick()  {
        if (this.state.newUser) {
            this.props.userSignup({'email': this.state.email, 'password': this.state.password})
        } 
        else {
            this.props.userLogin({'email': this.state.email, 'password': this.state.password})
        }
    }

    render() {
        return (
            <View style={styles.container}> 
                <Card>
                    <Card.Content>
                        <Title style={styles.titleStyle}>Log in please</Title>
                        {this.state.newUser && <TextInput placeholder="name" value={this.state.name} onChangeText={text => this.onChangeName(text)}/>}        
                        <TextInput placeholder="email" value={this.state.email} onChangeText={text => this.onChangeEmail(text)}/>
                        <TextInput secureTextEntry={true} placeholder="password" value={this.state.password} onChangeText={text => this.onChangePassword(text)}/>
                    </Card.Content>
                    <Card.Actions style={styles.cardActionsContainer}> 
                        <Button disabled={!this.state.email && !this.state.password} title={this.state.newUser ? 'Sign Up' : "Log In"} onPress={() => this.onClick()}>
                            Submit
                        </Button> 
                        <Button onPress={() => this.toggleNewUser()} >
                            or {!this.state.newUser ? 'Sign Up' : 'Log In'}
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        )
    }
}
const mapStateToProps = (state) => { 
    const { } = state; 
    return {};
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ 
        userSignup, 
        userLogin
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(Auth)