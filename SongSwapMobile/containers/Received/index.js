import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native'; 
import { Text, Title, Card } from 'react-native-paper';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';


const styles = StyleSheet.create({
    container: { 
       display: 'flex', 
       flexDirection: 'column', 
       justifyContent: 'center', 
       alignContent:'center',
       paddingTop: 300,
       paddingLeft: 40, 
       paddingRight: 40, 
    },
    cardActionsContainer: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    titleStyle: {
        textAlign: 'center', 
    }, 
    textStyle: { 
        textAlign: 'center', 
        opacity: 0.7,
    }
})

class Received extends Component {   
    render() { 
        return ( 
            <View style={styles.container}> 
                { 
                    this.props.lastSong.title && this.props.lastSong.artist ?                 
                    <Title style={styles.titleStyle}> 
                        Last Song You Got
                    </Title> : 
                    <Title style={styles.titleStyle}> 
                        You Haven't Traded Yet!
                    </Title> 
                }
                {
                    this.props.lastSong.title && this.props.lastSong.artist ? 
                    <Card style={{elevation: 10, marginTop: 10}}> 
                        <Card.Content>
                            <Title style={styles.titleStyle}> 
                                {this.props.lastSong.title}
                            </Title>
                            <Text style={styles.textStyle}> 
                                {this.props.lastSong.artist}
                            </Text>
                        </Card.Content>
                    </Card> :
                    null
                }
                
            
            </View>
        )
    }

}

const mapStateToProps = (state) => { 
    const { lastSong, history } = state; 
    return { lastSong, history }; 
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Received)