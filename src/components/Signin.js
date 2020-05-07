import React from "react";
import firebase from "firebase/app";

function Signin(){ 
  
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
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
      console.log("Successfully signed IN!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed OUT!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  
  return (
    <div className="signin">
      <h1>Sign Up Right Here yo</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='password' />
        <button type='submit'>Sign up</button>
      </form>

      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signInEmail'
          placeholder='email' />
        <input
          type='password'
          name='signInPassword'
          placeholder='password' />
        <button type='submit'>Sign in</button>
      </form>

      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign out</button>
    </div>
  );
}



export default Signin