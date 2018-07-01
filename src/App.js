import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classes from './components/form/Form.css';
import LoginButton from './components/LoginButton';

const config = {
  apiKey: "AIzaSyA3sIWuCGhRnsMM2uxTlOIZ8RDSk1oS4mo",
  authDomain: "phone-phax.firebaseapp.com",
  databaseURL: "https://phone-phax.firebaseio.com",
  projectId: "phone-phax",
  storageBucket: "phone-phax.appspot.com",
  messagingSenderId: "690418395994"
};

firebase.initializeApp(config);  

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: '',
      loggedIn: false
    };

    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref("users");

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        let dbRefUser = firebase.database().ref("users/" + user.uid);

        // checks to see if current user exists; if not, creates user
        dbRefUser.on("value", snapshot => {
          if (snapshot.exists()) {
            let loggedInUser = snapshot.val();

            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId
            });
            this.dbRefUser = dbRefUser;
          } else {
            let loggedInUser = {
              userId: user.uid,
              userName: user.displayName
            };
            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId
            });
            dbRefUser.set(loggedInUser);
          }
        });
      } else {
        this.dbRef.off("value");
        this.setState({
          loggedIn: false,
          currentUser: null
        });
      }
    });
  }

  adminPage = () => {
    this.props.history.push({ pathname: "/admin/form" });
  };
  
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    console.log("logging out");
    firebase.auth().signOut();
  }

  render() {
    return (
      <React.Fragment>
        <LoginButton loggedIn={this.state.loggedIn} loginWithGoogle={this.loginWithGoogle} logout={this.logout} />
        <button onClick={this.adminPage}>admin page</button>
      </React.Fragment>
    );
  }
}

export default App;
