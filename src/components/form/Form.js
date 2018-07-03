import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  browserHistory,
  withRouter
} from "react-router-dom";
import firebase from 'firebase';

class Form extends React.Component{
  constructor() {
    super();
    this.imageLink = React.createRef();
    this.state = {
      name: '',
      price: '',
      brand: '',
      camera: '',
      battery: '',
      weight: '',
      size: '',
      weight: '',
      imageLink: null
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault(); 
    const ref = firebase.storage().ref(`phone-phax`);
    const file = document.querySelector('#imageLink').files[0];
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        this.setState({
          imageLink: url
        }, () => {
          const product = {
            battery: this.state.camera,
            brand: this.state.price,
            camera: this.state.camera,
            name: this.state.name,
            price: this.state.price,
            size: this.state.size,
            weight: this.state.weight,
            imageLink: this.state.imageLink
          }
          const productName = Date.now();
          let dbRef = firebase.database().ref(`products/${productName}`);
          dbRef.set(product);
          this.setState({
            battery: '',
            brand: '',
            camera: '',
            name: '',
            price: '',
            size: '',
            weight: '',
            imageLink: null
          });
        })
        document.querySelector('#imageLink').value = null;
      })
      .catch(console.error);

  }


  render(){
    return <React.Fragment>
        <form action="" onSubmit={this.submitHandler}>
          <input type="text" placeholder="Name" name="name" value={this.state.name} required onChange={this.handleChange} />
          <input type="text" placeholder="Price" name="price" value={this.state.price} required onChange={this.handleChange} />
          <input type="text" placeholder="Brand" name="brand" value={this.state.brand} required onChange={this.handleChange} />
          <input type="text" placeholder="Camera" name="camera" value={this.state.camera} onChange={this.handleChange} />
          <input type="text" placeholder="Battery" name="battery" value={this.state.battery} onChange={this.handleChange} />
          <input type="text" placeholder="Weight" name="weight" value={this.state.weight} onChange={this.handleChange} />
          <input type="text" placeholder="Size" name="size" value={this.state.size} onChange={this.handleChange} />
          <input type="file" name="imageLink" id="imageLink" accept="images/*" ref={this.imageLink} />
          <button>Submit</button>
        </form>
      </React.Fragment>;
  }
}

export default Form;
