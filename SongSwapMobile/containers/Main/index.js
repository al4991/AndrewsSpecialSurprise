import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setTitle, setArtist, swapSong, retrieveHistory } from './../../duck/actions';

import MainScreenForm from '../../components/MainScreenForm';

const styles = StyleSheet.create({
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

class MainScreen extends Component {
    componentDidMount() {
        this.props.retrieveHistory(); 
    }
    render() { 
        return ( 
            <View style={styles.container}> 
                <MainScreenForm 
                    title={this.props.title} artist={this.props.artist} 
                    setTitle={this.props.setTitle} setArtist={this.props.setArtist} 
                    onSwap={async () => {
                        await this.props.swapSong();
                        this.props.navigation.navigate('Last Song');
                    }}
                />   
            </View>
        )
    }
}

const mapStateToProps = (state) => { 
    const { title, artist } = state; 
    return { title, artist };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ 
        setTitle, 
        setArtist,
        swapSong,
        retrieveHistory
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)