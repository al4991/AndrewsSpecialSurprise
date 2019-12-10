import { SET_TITLE, SET_ARTIST, ADD_SONG, SET_RECEIVED, SET_HISTORY } from "./types";
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore";
import db from '../firebaseConfig';
const songs = db.collection('songs');

export const addSong = () => (
    {
        type: ADD_SONG
    }
);

export const setReceivedSong = (received) => (
    {
        type: SET_RECEIVED, 
        payload: received
    }
)

export const retrieveHistory = () => { 
    return async (dispatch) => {
        try { 
            const history = await AsyncStorage.getItem('@BeepBeepLechuga:history');
            if (history !== null)  {
                dispatch(setHistory(JSON.parse(history))); 
            }
            else {
                dispatch(setHistory([])); 
            }
        }
        catch (err) { 
            console.log(err);
        }
    }
}

export const setHistory = (history) => (
    {
        type: SET_HISTORY, 
        payload: history
    }
)

 /*
    The retrieveSong function essentially queries the database by generating a random id, 
    and comparing it to all the ids in the database. 
    We check for an id that is bigger than the one just generated and if we find one, 
    we pick, else look for one smaller than the one we generated. 
    It's kind of reminiscent of lottery scheduling? 

    I referenced this post, specifically the answer by ajzbc
    https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
*/
export const swapSong = function() {


    const updateHistory = async (dispatch, history, newTitle, newArtist) => {
        const newHistory =  [...history, { title: newTitle, artist: newArtist }]
        try {
            await AsyncStorage.setItem('@BeepBeepLechuga:history', JSON.stringify(newHistory))
            dispatch(setHistory(newHistory));
        }
        catch { 
            err => console.log(err);
        }
    }

    const retrieveSong = async (dispatch, history) => { 
        let key = songs.doc().id; 
        songs.where(firebase.firestore.FieldPath.documentId(), '>=', key)
        .limit(1).get()
        .then(snapshot => {
            if (snapshot.empty) { 
                songs.where(admin.firestore.FieldPath.documentId(), '<', key)
                .limit(1).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {                        
                        updateHistory(dispatch, history, doc.data().name, doc.data().artist);
                        dispatch(setReceivedSong({ title: doc.data().name, artist: doc.data().artist })); 
                    });
                }) 
                .catch(err => console.log(err));
            }
            else {
                snapshot.forEach(doc => {
                    updateHistory(dispatch, history, doc.data().name, doc.data().artist);
                    dispatch(setReceivedSong({ title: doc.data().name, artist: doc.data().artist })); 
                });
            }
        })
        
    }
   
    return async (dispatch, getState) => {
        const { title, artist, history } = getState();
        songs.add({ 
            artist: artist, 
            count: 3, 
            name: title
        })
        .then(async () => { 
            await retrieveSong(dispatch, history);
            dispatch(addSong()); 
        })
        .catch(err => console.log(err));
    }
}

export const setTitle = (text) => (
    {
        type: SET_TITLE,
        payload: text
    }
)
export const setArtist = (text) => (
    {
        type: SET_ARTIST,
        payload: text
    }
)