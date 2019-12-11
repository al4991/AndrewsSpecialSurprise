import React, { Component } from 'react'; 
import { View, StyleSheet } from 'react-native'; 
import { Title, Button } from 'react-native-paper'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { userLogout } from './../../duck/actions';


const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignContent: 'center', 
        paddingTop: 300, 
        paddingLeft: 40, 
        paddingRight: 40
    },
    textStyle: { 
        textAlign: 'center'
    }
})

class User extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.textStyle}> 
                    Hi {this.props.user.email}
                </Title>
                <Button mode="outlined" onPress={this.props.userLogout}>
                    Log out
                </Button> 
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user }; 
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        userLogout
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(User)