import React, { Component } from 'react'; 
import { View, StyleSheet } from 'react-native'; 
import { Card, Title, Button } from 'react-native-paper'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import HistoryList from '../../components/HistoryList';
import { userLogout, retrieveUserPushed } from './../../duck/actions';


const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignContent: 'center', 
        paddingTop: 50, 

    },
    textStyle: { 
        textAlign: 'center'
    },
    cardActionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },
})

class User extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Card style={{elevation: 10, marginBottom: 30}}>  
                    <Card.Content>
                        <Title style={styles.textStyle}> 
                            Hi {this.props.user.providerData ? this.props.user.providerData[0].displayName : null}!
                        </Title>
                    </Card.Content>
                    <Card.Actions  style={styles.cardActionsContainer}>
                        <Button onPress={this.props.userLogout}>
                            Log out
                        </Button> 
                    </Card.Actions>
                </Card>
                {this.props.userPushed.length === 0 ? 
                <Title style={styles.textStyle}> You haven't traded any songs yet! </Title> :
                <Title style={styles.textStyle}> Songs you've sent out! </Title>
                }
                <HistoryList history={this.props.userPushed.map(elem => ({ title: elem.name, artist: elem.artist }) )} />
                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, userPushed } = state;
    return { user, userPushed }; 
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        retrieveUserPushed, 
        userLogout
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(User)