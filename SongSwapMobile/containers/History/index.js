import React, {Component} from 'react';
import { View, StyleSheet} from 'react-native'; 
import { Title } from 'react-native-paper';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import HistoryList from './../../components/HistoryList';

const styles = StyleSheet.create({
    container: { 
       display: 'flex', 
       flex: 1,
       flexDirection: 'column', 
       justifyContent: 'center', 
       alignContent:'center',
       paddingTop: 40,
    },
    titleStyle: {
        textAlign: 'center', 
    }, 
})

class History extends Component { 
    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.titleStyle}> 
                    Received Song History
                </Title>
                <HistoryList history={this.props.history}/>
            </View>
            
        )
    }
}


const mapStateToProps = (state) => { 
    const { history } = state; 
    return { history }; 
}

const mapDispatchToProps  = (dispatch) => (
    bindActionCreators({}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(History);
