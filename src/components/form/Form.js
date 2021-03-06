import React from 'react';
import firebase from 'firebase';
import classes from './Form.css';

class Form extends React.Component {
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

    //stops form submittion if price is not a number
    const priceValue = e.currentTarget[1].value;
    if (isNaN(priceValue)) {
      alert("Please enter numbers only");
      return false;
    }

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
            battery: this.state.battery,
            brand: this.state.brand,
            camera: this.state.camera,
            imageLink: this.state.imageLink,
            name: this.state.name,
            price: this.state.price,
            size: this.state.size,
            weight: this.state.weight
          }
          const productName = Date.now();
          this.props.callBackFromForm(product, productName);
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


  render() {
    return <div className="form-container">
      <div className="wrapper">
      <h2 className="form__heading">Add product to inventory</h2>
      <form className="form" action="" onSubmit={this.submitHandler}>
        <div className="form__item">
          <label className="form__label" htmlFor="name">Name</label>
          <input className="form__input" type="text" placeholder="Name" name="name" value={this.state.name} required onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="price">Price</label>
          <input className="form__input" type="text" placeholder="Price" name="price" value={this.state.price} required onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="brand">Brand</label>
          <input className="form__input" type="text" placeholder="Brand" name="brand" value={this.state.brand} required onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="camera">Camera</label>
          <input className="form__input" type="text" placeholder="Camera" name="camera" value={this.state.camera} onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="battery">Battery</label>
          <input className="form__input" type="text" placeholder="Battery" name="battery" value={this.state.battery} onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="weight">Weight</label>
          <input className="form__input" type="text" placeholder="Weight" name="weight" value={this.state.weight} onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="size">Size</label>
          <input className="form__input" type="text" placeholder="Size" name="size" value={this.state.size} onChange={this.handleChange} />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="imageLink">Image</label>
          <input className="form__input" type="file" name="imageLink" id="imageLink" accept="images/*" required ref={this.imageLink} />
        </div>
        <div className="form__buttons">
            <a className="form__button form__button--secondary" onClick={this.props.adminPage}><i className="fas fa-minus-circle"></i> Hide form</a>
            <button className="form__button"><i className="fas fa-plus"></i> Add item to inventory</button>
          </div>
      </form>
      </div>
    </div>;
  }
}

export default Form;