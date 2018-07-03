import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Form from './components/form/Form';
import LoginButton from './components/LoginButton';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ProductSingle from './components/ProductSingle/ProductSingle';
import testProducts from './testProducts';
import ImageUpload from './components/ImageUpload';

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
      currentUserId: '',
      currentUserRole: '',
      loggedIn: false,
      products: {}
    };
    
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  adminPage = () => {
    this.props.history.push("/admin/form");
  }
<<<<<<< HEAD



=======
>>>>>>> 298f2bfb0c5fddcd1c6cde4cd37bf7320717b1cf
  
   componentDidMount() {
    this.usersDbRef = firebase.database().ref("users");
    this.productsDbRef = firebase.database().ref('products');

    this.productsDbRef.on("value", snapshot => {
        const savedProducts = snapshot.val();
        this.setState({
          products: savedProducts
        })
    })
    
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
              currentUserId: loggedInUser.userId,
              currentUserRole: loggedInUser.userRole
            });
            this.dbRefUser = dbRefUser;
          } else {
            let loggedInUser = {
              userId: user.uid,
              userName: user.displayName,
              userRole: 'consumer'
            };
            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId,
              currentUserRole: loggedInUser.userRole
            });
            dbRefUser.set(loggedInUser);
          }
        });
      } else {
        this.usersDbRef.off("value");
        this.setState({
          loggedIn: false,
          currentUser: null,
          currentUserId: '',
          currentUserRole: ''
        });
      }
    });
  }

  adminPage = () => {
    this.props.history.push({ pathname: "/admin/form" });
  };

  loadTestProducts = () => {
    Object.keys(testProducts).map((key) => {
      let dbRef = firebase.database().ref(`products/${key}`);
      dbRef.set(testProducts[key]);
    })
  }
  
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
    firebase.auth().signOut();
  }

  removeItem(keyToRemove) {
    console.log(keyToRemove);
    firebase
      .database()
      .ref(`products/${keyToRemove}`)
      .remove();
  }

  render() {
    const FormContainer = (props) => {
      return (
        <Form 
          submit={this.submitHandler}
        />
      )
    }
<<<<<<< HEAD
    return <React.Fragment>
          
=======
    return <React.Fragment>          
>>>>>>> 298f2bfb0c5fddcd1c6cde4cd37bf7320717b1cf
        <LoginButton loggedIn={this.state.loggedIn} loginWithGoogle={this.loginWithGoogle} logout={this.logout} />
        <button onClick={this.adminPage}>admin page</button>
        {this.state.currentUserRole === 'admin' && <button onClick={this.loadTestProducts}>Load sample products</button>}
        <ImageUpload />
        <ProductGrid products={this.state.products} currentUserRole={this.state.currentUserRole} removeItem={this.removeItem} />
        
        <BrowserRouter>
        
            {/* <Route exact path="/" component={App} /> */}
            <Route path="/admin/form" render={(props)=><Form />} />
      
<<<<<<< HEAD
        </BrowserRouter>
=======
          {/* <Route exact path="/" component={App} /> */}
          <Route path="/admin/form" component={Form} />    
      </BrowserRouter>
>>>>>>> 298f2bfb0c5fddcd1c6cde4cd37bf7320717b1cf
      </React.Fragment>;
  }

}

export default App;
