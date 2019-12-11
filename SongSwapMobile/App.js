import React from 'react';

import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk';

import reducer from './duck/reducer'; 
import AuthGate from './containers/AuthGate';

import { setUser, setLoggedin, setReceivedSong } from './duck/actions';

import firebase from './firebaseConfig';

const store = createStore(reducer, applyMiddleware(thunk)); 

firebase.auth().onAuthStateChanged( user => {
  if (user) { 
    store.dispatch(setUser(user)); 
    store.dispatch(setLoggedin(true)); 
  }
  else { 
    store.dispatch(setUser({}));
    store.dispatch(setLoggedin(false));
    store.dispatch(setReceivedSong({title: '', artist: '', }))
  }
});

export default function App() {
  return (
    <Provider store={store}> 
      <AuthGate />
    </Provider>
  );
}