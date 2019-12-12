const express = require('express');
const router = express.Router(); 

const firebase = require('../../firebase.js');
const db = firebase.firestore(); 
const songs = db.collection('songs'); 
const userMeta = db.collection('user-meta'); 

router.get('/', (req, res) => { 
    res.send('hi')
})

router.get('/sentSongs/:user', (req, res) => {
    let user = req.params.user; 
    const data = [];
    songs.where('creator', '==', user).get()
    .then(snapshot => {
        snapshot.forEach(doc => { 
            data.push(doc.data()); 
        })
        res.send(data); 
    })
    .catch(err => console.log(err)); 
});

router.get('/receivedSongs/:user', (req, res) => {
    let user = req.params.user; 
    const data = []; 
    userMeta.where('receiver', '==', user).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            data.push(doc.data());
        })
        res.send(data); 
    })
    .catch(err => console.log(err));  
});

/*
flow should be as follows
- user pulls a random song
- user adds random song to record of all pulled songs
    - this is an array of objets that is stored as json data
- user adds own song to database
*/
/*
if current way of keeping track of new shit isnt working, try to just store all received in a new store, 
storing recipient uid to pull
    - dumb inefficient but simple
*/
router.get('/swapSong/:user', (req, res) => { 
    let user = req.params.user; 
    let song = {}; 
    let key = songs.doc().id; 
    songs.where(firebase.firestore.FieldPath.documentId(), '>=', key)
    .limit(1).get()
    .then(snapshot => {
        if (snapshot.empty) { 
            songs.where(admin.firestore.FieldPath.documentId(), '<', key)
            .limit(1).get()
            .then(snapshot1 => {
                snapshot1.forEach(doc1 => {       
                    userMeta.add({
                        name: doc1.data().name, 
                        artist: doc1.data().artist, 
                        receiver: user
                    })
                    .catch(err => console.log(err));
                    res.send(doc1.data());
                    
                });
            }) 
            .catch(err => console.log(err));
        }
        else {
            snapshot.forEach(doc1 => { 
                userMeta.add({
                    name: doc1.data().name, 
                    artist: doc1.data().artist, 
                    receiver: user
                })
                .catch(err => console.log(err))
                res.send(doc1.data());
            })
        }
    })
    .catch(err => console.log(err)); 
})


router.get('/addSong/:user', (req, res) => {
    let user = req.params.user;
    songs.add({
        name: req.query.name ? req.query.name : '', 
        artist: req.query.artist ? req.query.artist : '', 
        creator: user ? user : ''
    })
    .then(ref => {
        console.log(ref); 
        res.send(ref)
    })
    .catch(err => res.send(err)); 
}); 

module.exports = router; 