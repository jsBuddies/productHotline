import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import classes from './components/form/Form.css';
import LoginButton from './components/LoginButton';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ProductSingle from './components/ProductSingle/ProductSingle';

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
      loggedIn: false,
      products: [
        {
          brand: 'Apple',
          name: 'iPhone X', 
          price: '$1099', 
          link: 'https://www.apple.com/shop/buy-iphone/iphone-x', 
          imageLink: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/x/iphone-x-select-2017'
        },
        {
          brand: 'Apple',
          name: 'iPhone 8',
          price: '$899',
          link: 'https://www.apple.com/shop/buy-iphone/iphone-8',
          imageLink: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone8/select/iphone8-select-2018'
        },
        {
          brand: 'Apple',
          name: 'iPhone 7',
          price: '$799',
          link: 'https://www.apple.com/shop/buy-iphone/iphone-7',
          imageLink: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/plus/iphone7-plus-select-2016'
        },
        {
          brand: 'Apple',
          name: 'iPhone 6S',
          price: '$699',
          link: 'https://www.apple.com/shop/buy-iphone/iphone6s',
          imageLink: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6sp/silver/iphone6sp-silver-select'
        },
        {
          brand: 'Samsung',
          name: 'Galaxy J3 Prime',
          price: '$199.99',
          link: 'https://www.samsung.com/ca/smartphones/galaxy-j3-prime-sm-j327/',
          imageLink: '//images.samsung.com/is/image/samsung/ca-galaxy-j3-prime-sm-j327-sm-j327wzkaxac-81658228?$PD_GALLERY_L_JPG$'
        },
        {
          brand: 'Samsung',
          name: 'Galaxy S9',
          price: '$959.99',
          link: 'https://www.samsung.com/ca/smartphones/galaxy-s9/shop/',
          imageLink: '//image.samsung.com/ca/smartphones/galaxy-s9/shop/buyingtool/product/product_galaxys9_titaniumgray2_01.png'
        }
      ],
      testProduct: {
        brand: 'Apple',
        name: 'iPhone X',
        price: '$1099',
        link: 'https://www.apple.com/shop/buy-iphone/iphone-x',
        imageLink: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/x/iphone-x-select-2017',
        camera: '12MP',
        battery: 'Built-in rechargeable lithium‑ion battery',
        weight: '6.14 ounces',
        size: '5.65\"'
      }
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
              userName: user.displayName,
              userRole: 'consumer'
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
    firebase.auth().signOut();
  }

  render() {
    return (
      <React.Fragment>
        <LoginButton loggedIn={this.state.loggedIn} loginWithGoogle={this.loginWithGoogle} logout={this.logout} />
        <button onClick={this.adminPage}>admin page</button>
        <ProductGrid products={this.state.products} />
        <ProductSingle product={this.state.testProduct} />
      </React.Fragment>
    );
  }
}

export default App;
