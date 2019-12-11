import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setTitle, setArtist, swapSong, retrieveHistory, retrieveUserPushed } from './../../duck/actions';

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

class Main extends Component {
    componentDidMount() {
        this.props.retrieveHistory(); 
        this.props.retrieveUserPushed(); 
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
    const { title, artist, user } = state; 
    return { title, artist, user };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ 
        setTitle, 
        setArtist,
        swapSong,
        retrieveHistory, 
        retrieveUserPushed
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(Main)