const firebase = require('firebase'); 

const firebaseConfig = {
    apiKey: "AIzaSyBcafPmzB-xN5iYGj0FCfB-Q3F1xp88v8E",
    authDomain: "beepbeeplechuga-a1132.firebaseapp.com",
    databaseURL: "https://beepbeeplechuga-a1132.firebaseio.com",
    projectId: "beepbeeplechuga-a1132",
    storageBucket: "beepbeeplechuga-a1132.appspot.com",
    messagingSenderId: "748465080774",
    appId: "1:748465080774:web:a7282e758f31f222cacac7"
}

firebase.initializeApp(firebaseConfig); 
 

module.exports = firebase;
