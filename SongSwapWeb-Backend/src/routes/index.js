const express = require('express');
const path = require("path"); 
const router = express.Router(); 

const firebase = require('../../firebase.js');
const db = firebase.firestore(); 
const auth = firebase.auth(); 
const songs = db.collection('songs'); 
const userMeta = db.collection('user-meta'); 


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
    let data = []; 
    userMeta.where(firebase.firestore.FieldPath.documentId(), '==', user)
    .limit(1).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            data = JSON.parse(doc.data().received);
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

                    userMeta.where(firebase.firestore.FieldPath.documentId(), '==', user)
                    .limit(1).get()
                    .then(snapshot2 => {
                        snapshot2.forEach(doc2 => {
                            let data = [...JSON.parse(doc2.data().received)];
                            data.push(doc1.data());
                            userMeta.doc(doc2.id).update({received: JSON.stringify(data)});
                        })
                    })
                    res.send(doc1.data());
                    
                });
            }) 
            .catch(err => console.log(err));
        }
        else {
            snapshot.forEach(doc1 => {       
                userMeta.where(firebase.firestore.FieldPath.documentId(), '==', user)
                .limit(1).get()
                .then(snapshot2 => {
                    snapshot2.forEach(doc2 => {
                        let data = [...JSON.parse(doc2.data().received)];
                        data.push(doc1.data());
                        userMeta.doc(doc2.id).update({received: JSON.stringify(data)});
                    })
                })
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



