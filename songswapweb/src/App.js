import React, { useState, useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom'; 
import firebase from './firebase'; 

import Home from './containers/Home'; 
import Auth from './components/Auth'
import Header from './components/Header';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [user, setUser] = useState({})


  useEffect(() => { 
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(err => console.log('err', err))
  })

  useEffect(() => { 
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) { 
          setLoggedIn(true); 
          setUser(user);
        }
        else { 
          setLoggedIn(false); 
          setUser({})
        }
      })
  }, [])

  function signupFunction(e) {
    e.preventDefault(); 
    let email = e.currentTarget.createAccountEmail.value;  
    let password = e.currentTarget.createAccountPassword.value;
    let name = e.currentTarget.createAccountName.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => { 
        firebase.auth().currentUser.updateProfile({
          displayName: name
        })
        .then(() => {
          setLoggedIn(true);
        })
      })
      .catch(err => console.log('err', err)); 
  }

  function loginFunction(e) { 
    e.preventDefault(); 
    let email = e.currentTarget.loginEmail.value;  
    let password = e.currentTarget.loginPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.log('err', err));
  }

  function logoutFunction(e) {
    e.preventDefault(); 
    firebase
      .auth()
      .signOut()
      .catch(err => console.log('err', err)); 
  }

  console.log(loggedIn);
  return (
    <div className="App">
      <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
      <Router> 
        <Route exact path='/' render={() => 
          loggedIn ? <Home user={user} logoutFunction={logoutFunction}/> : <Redirect to='/login'/>
        }/> 
        <Route exact path='/login'>
          {!loggedIn ? <Auth loginFunction={loginFunction} signupFunction={signupFunction}/> : <Redirect to="/"/> } 
        </Route>
      </Router>
    </div>
  );
}

export default App;