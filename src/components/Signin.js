import React, { useState } from "react";
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase';
import 'firebase/auth';

function Signin(props){ 

  const [reRender, setreRender] = useState(false);
  //const [stateslice, method to update stateslice] = useState(initialStateValue)
  
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      setreRender(true);
      console.log("successfully signed UP!");
    }).catch(function(error) {
      console.log(error.message);
    });
  } 
  
  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      setreRender(true);
      console.log("Successfully signed IN!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(function() {
      setreRender(false);
      console.log("Successfully signed OUT!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  let auth = props.firebase.auth();
  if (!isLoaded(auth)) {
    return (
      <p> Loading... </p>
    )
  }

  if ((isLoaded(auth)) && (auth.currentUser == null)) {
    return (
      <div>
      {/* <div style='
        display: flex;
        border: 1px solid rgba(0, 0, 0, 0.3);'
      > */}
        <h1>If you already have an account, Sign In!</h1>
        <form onSubmit={doSignIn}>
          <input
            type='text'
            name='signInEmail'
            placeholder='email' />
          <input
            type='password'
            // style='border-color: transparent;
            //       flex: 1;'
            name='signInPassword'
            placeholder='password' />
          <button type='submit'>Sign in</button>
        </form>

        <h1>New user? Sign Up Right Here yo</h1>
        <form onSubmit={doSignUp}>
          <input
            type='text'
            name='email'
            placeholder='email' />
          <input
            type='password'
            //  style='border-color: transparent;
            //       flex: 1;'
            name='password'
            placeholder='password' />
          <button type='submit'>Sign up</button>
        </form>

      </div>
    )
  }

  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    return (
      <div className="signin">
      
  
        <h1>Sign Out</h1>
        <button onClick={doSignOut}>Sign out</button>
      </div>
    );
  } 
}

export default withFirestore(Signin);