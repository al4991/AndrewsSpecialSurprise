import { ADD_SONG, SET_TITLE, SET_ARTIST, SET_RECEIVED, SET_HISTORY, SET_USER, SET_LOGGEDIN } from './types'; 

const INITIAL_STATE = {
    title: '',
    artist: '',
    lastSong: { 
        title: '', 
        artist: '', 
    }, 
    history: [],
    user: {}, 
    loggedin: false, 
    
}

export default function reducer(state = INITIAL_STATE, action) { 
    switch(action.type) { 
        case ADD_SONG: {
            return {
                ...state, 
                'title' : '', 
                'artist': ''
            }
        }
        case SET_TITLE: {
            let { title } = state; 
            title = action.payload; 
            return {
                ...state, 
                title
            }
        }
        case SET_ARTIST: {
            let { artist } = state; 
            artist = action.payload; 
            return {
                ...state, 
                artist
            }
        }
        case SET_RECEIVED: { 
            let lastReceived = action.payload;
            return {
                ...state, 
                lastSong : {
                    ...lastReceived
                }
            }
        }
        case SET_HISTORY: { 
            let history = [...action.payload]
            if (history.length > 0 && state.lastSong.title === '') { 
                return { 
                    ...state, 
                    lastSong : {
                        ...history[history.length - 1]
                    }, 
                    history
                }
            }
            return {
                ...state, 
                history
            }

        }
        case SET_USER: {
            let user = {...action.payload}; 
            return {
                ...state,
                user
            }
        }
        case SET_LOGGEDIN: { 
            let loggedin = action.payload; 
            return {
                ...state, 
                loggedin
            }
        }
        default: {
            return state; 
        }
    }

}

