import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcafPmzB-xN5iYGj0FCfB-Q3F1xp88v8E",
  authDomain: "beepbeeplechuga-a1132.firebaseapp.com",
  databaseURL: "https://beepbeeplechuga-a1132.firebaseio.com/",
  storageBucket: "beepbeeplechuga-a1132.appspot.com",
  projectId: "beepbeeplechuga-a1132"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(); 

export default firebase;
