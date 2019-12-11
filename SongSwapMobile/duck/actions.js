import { SET_TITLE, SET_ARTIST, ADD_SONG, SET_RECEIVED, SET_HISTORY, SET_USER, SET_LOGGEDIN, SET_USER_PUSHED } from "./types";
import { AsyncStorage } from 'react-native';
import firebase, { db } from '../firebaseConfig';
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
    return async (dispatch, getState) => {
        try { 
            const { user } = getState(); 
            const history = await AsyncStorage.getItem(`@BeepBeepLechuga:history:${user.uid}`);
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

export const setUserPushed = (data) => (
    {
        type: SET_USER_PUSHED, 
        payload: data
    }
)

export const retrieveUserPushed = () => { 
    return async (dispatch, getState) => { 
        try {
            const { user } = getState(); 
            const userId = user.uid;
            const data = [];
            songs.where('creator', '==', userId).get()
                .then(snapshot => {
                    snapshot.forEach(doc => { 
                        data.push(doc.data());
                    })
                    dispatch(setUserPushed(data))
                });
        }
        catch (err){
            console.log(err); 
        }
    }
}

export const userSignup = (userInfo) => {
    return async (dispatch) => { 
        try { 
            const { email, password, name } = userInfo;
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { 
                firebase.auth().currentUser.updateProfile({
                    displayName: name
                })
            })
            .catch(err => console.log(err));

        }
        catch (err) { 
            console.log(err); 
        }
    }
}

export const userLogin = (userInfo) => { 
    return async (dispatch) => {
        try { 
            const { email, password } = userInfo;
            firebase.auth().signInWithEmailAndPassword(email, password);         
        }
        catch (err) {
            console.log(err); 
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => { 
        try {
            firebase.auth().signOut();
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

export const clearHistory = () => {
    async (dispatch, getState) => {
        try {
            const { user } = getState(); 
            const newHistory = [];
            await AsyncStorage.setItem(`@BeepBeepLechuga:history:${user.uid}`, JSON.stringify(newHistory))
            dispatch(setHistory(newHistory));
        }
        catch { 
            err => console.log(err);
        }
    }
}

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
    const updateHistory = async (dispatch, history, newTitle, newArtist, userId) => {
        const newHistory =  [...history, { title: newTitle, artist: newArtist }]
        try {
            await AsyncStorage.setItem(`@BeepBeepLechuga:history:${userId}`, JSON.stringify(newHistory))
            dispatch(setHistory(newHistory));
        }
        catch { 
            err => console.log(err);
        }
    }

    const retrieveSong = async (dispatch, history, userId) => { 
        let key = songs.doc().id; 
        songs.where(firebase.firestore.FieldPath.documentId(), '>=', key)
        .limit(1).get()
        .then(snapshot => {
            if (snapshot.empty) { 
                songs.where(admin.firestore.FieldPath.documentId(), '<', key)
                .limit(1).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {                        
                        updateHistory(dispatch, history, doc.data().name, doc.data().artist, userId);
                        dispatch(setReceivedSong({ title: doc.data().name, artist: doc.data().artist })); 
                    });
                }) 
                .catch(err => console.log(err));
            }
            else {
                snapshot.forEach(doc => {
                    updateHistory(dispatch, history, doc.data().name, doc.data().artist, userId);
                    dispatch(setReceivedSong({ title: doc.data().name, artist: doc.data().artist })); 
                });
            }
        })
        
    }
   
    return async (dispatch, getState) => {
        const { title, artist, history, user } = getState();
        songs.add({ 
            artist: artist, 
            count: 3, 
            name: title, 
            creator: user.uid
        })
        .then(async () => { 
            await retrieveSong(dispatch, history, user.uid);
            dispatch(addSong()); 
            dispatch(retrieveUserPushed());
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

export const setUser = (user) => (
    {
        type: SET_USER, 
        payload: user
    }
)

export const setLoggedin = (loggedin) => (
    {
        type: SET_LOGGEDIN, 
        payload: loggedin

    }
)