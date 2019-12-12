import React, { Component } from 'react'; 
import axios from 'axios'; 
import { Card, TextField, Button, Typography } from '@material-ui/core';


import TradeForm from './../../components/TradeForm';

const styles = { 
    container: { 
        display: 'flex', 
        flex: 1, 
        backgroundColor: '#21D4FD',
        backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
        width: '100vw', 
        height: '100vh', 
        position: 'absolute', 
        top: 0, 
        left:0, 
        right:0,  
        textAlign: 'center', 
        color: '#f0f4ff',
        overflow: 'auto', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 

    },
    userandLogout: {
        display:'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        width: '100vw', 
        position: 'absolute', 
        top: 15, 
        right: 15, 
    },

    userContainer: { 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50, 
        width: '30vw', 
        height: '30vh', 
    
    }, 
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw', 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 

    },
    tradeContainer: { 
        display: 'flex',
        flexDirection: 'column', 
        height: '30vh', 
        flex: 1, 
    }, 
    sentContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1
    }, 
    receivedContainer : {
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1
    }
}

export default class Home extends Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            trading: true,
            sentSongs: [],
            receivedSongs: [], 
            lastSong: {}
        }
    }

    componentDidMount() {
        this.fetchSent();
    }

    fetchSent() {
        axios.get(`https://enigmatic-oasis-63826.herokuapp.com/sentSongs/${this.props.user.uid}`)
        .then(res => { 
            this.setState({...this.state, sentSongs: [...res.data]})
        })
        .catch(err => console.log(err)) ;
    }

    fetchReceived() { 
        axios.get(`https://enigmatic-oasis-63826.herokuapp.com/receivedSongs/${this.props.user.uid}`)
        .then(res => {
            console.log(res.data);
            this.setState({ 
                ...this.state, 
                receivedSongs: [...res.data]
            })
        })
        .catch(err => console.log(err)); 
    }
    
    performSwap(e) {
        e.preventDefault(); 
        const name = e.currentTarget.tradeName.value;
        const artist = e.currentTarget.tradeArtist.value;
        
        axios.get(`https://enigmatic-oasis-63826.herokuapp.com/swapSong/${this.props.user.uid}`)
        .then(res => {
            console.log(res.data);
            axios.get(`https://enigmatic-oasis-63826.herokuapp.com/addSong/${this.props.user.uid}`, {                
                params : {
                    name, 
                    artist
                }
            })
            .then( res => { 
                this.fetchSent(); 
                console.log('======', res.data); 
            })
            this.setState({...this.state, trading: false, lastSong: {...res.data}})
        })
    }

    renderTradeForm() { 
        return this.state.trading ? <TradeForm submitFunction={(e) => this.performSwap(e)}/> : null;
    } 

    renderSentSongs() {       
        return ( 
            <div> 
                {this.state.sentSongs.map(elem => (
                    <p> 
                        {elem.name}
                    </p>
                ))}
            </div>
        )
    }

    renderReceivedSongs() { 
        return (
            <div> 
                {this.state.receivedSongs.map(elem => (
                    <p>
                        {elem.name}
                    </p>
                ))}
            </div>
        )
    }

    renderResult() {
        if (!this.state.trading) { 
            return (
                <div> 
                    <Card style={{elevation: 10, padding: 20, margin: 20}}> 
                        <Typography component= "h1" variant="h5"> 
                            {this.state.lastSong ? this.state.lastSong.name : null}
                        </Typography>
                        <Typography component="h1" variant="subtitle1"> 
                            {this.state.lastSong ? this.state.lastSong.artist : null}
                        </Typography>
                       
                    </Card>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={
                            () => this.setState({...this.state, trading: true, lastSong: {}})
                        }
                    > 
                        Done
                    </Button>
                </div>
            )
        }
        else {
            return null 
        }
    }
    render() { 
        console.log(this.props.user)
        console.log(this.state)

        return(
            <div style={styles.container}> 
                <div style={styles.userandLogout}> 
                    <Button 
                            onClick={this.props.logoutFunction}
                            variant='contained'
                            color='secondary'
                        >
                        Log Out as {this.props.user.displayName}
                    </Button>
                </div>

                <Card style={styles.userContainer}> 
                    
                    <Typography component="h3" variant="h4"> 
                        {this.state.trading ? 'Put in a song to send!' : 'You got' }
                    </Typography>
                    {this.renderTradeForm()}
                    {this.renderResult()}
                </Card> 
                {/* <div style={styles.bottomContainer}> 
                    
                    <Card style={styles.sentContainer}> 
                        <button onClick={() => this.fetchSent()}>Sent</button>
                        {this.renderSentSongs()}
                    </Card>

                    <Card style={styles.receivedContainer}> 
                        <button onClick={() => this.fetchReceived()}>Received</button>
                        {this.renderReceivedSongs()}
                    </Card>
                </div> */}
            </div>
        )
    }
}
//                <button onClick={() => this.setState({...this.state, trading: !this.state.trading })}>Toggle Form</button>
