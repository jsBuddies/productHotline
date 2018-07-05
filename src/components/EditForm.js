import React from 'react';
import firebase from 'firebase';
import classes from './form/Form.css';

class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      brand: "",
      camera: "",
      battery: "",
      weight: "",
      size: "",
      imageLink: null,
      productId: ''
    };
  }

  componentDidMount() {
    const productId = this.props.keyToEdit;
    this.productDbRef = firebase.database().ref(`products/${productId}`);
    this.productDbRef.on("value", snapshot => {
      const product = snapshot.val();
      this.setState({
        name: product.name,
        price: product.price,
        brand: product.brand,
        camera: product.camera,
        battery: product.battery,
        weight: product.weight,
        size: product.size,
        imageLink: product.imageLink,
        productId
      });
    });
  }



  componentDidUpdate(prevProps) {
    const productId = this.props.keyToEdit;
    if (this.props.keyToEdit !== prevProps.keyToEdit) {
      this.setState({
        productId: this.props.keyToEdit
      }, () => {
        this.productDbRef = firebase.database().ref(`products/${productId}`);
        this.productDbRef.on("value", snapshot => {
          const product = snapshot.val();
          this.setState({
            name: product.name,
            price: product.price,
            brand: product.brand,
            camera: product.camera,
            battery: product.battery,
            weight: product.weight,
            size: product.size,
            imageLink: product.imageLink,
            productId
          });
        });
      });
    }
  }


  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
        const product = {
            battery: this.state.battery || '',
            brand: this.state.brand || '',
            camera: this.state.camera || '',
            imageLink: this.state.imageLink || '',
            name: this.state.name || '',
            price: this.state.price || '',
            size: this.state.size || '',
            weight: this.state.weight || ''
        };
        let dbRef = firebase.database().ref(`products/${this.state.productId}`);
        dbRef.set(product);
        this.setState({
            battery: "",
            brand: "",
            camera: "",
            name: "",
            price: "",
            size: "",
            weight: "",
            imageLink: null,
            productId: ''
        });
        this.props.closeEditForm();
  };

  render() {
    return <div className="form-container">
        <div className="wrapper">
          <h2 className="form__heading">Edit item</h2>
          <form className="form" action="" onSubmit={this.submitHandler}>
            <div className="form__item">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input className="form__input" type="text" placeholder="Name" name="name" value={this.state.name} required onChange={this.handleChange} />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="price">
                Price
              </label>
              <input className="form__input" type="text" placeholder="Price" name="price" value={this.state.price} required onChange={this.handleChange} />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="brand">
                Brand
              </label>
              <input className="form__input" type="text" placeholder="Brand" name="brand" value={this.state.brand} required onChange={this.handleChange} />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="camera">
                Camera
              </label>
              <input className="form__input" type="text" placeholder="Camera" name="camera" value={this.state.camera} onChange={this.handleChange} />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="battery">
                Battery
              </label>
              <input className="form__input" type="text" placeholder="Battery" name="battery" value={this.state.battery} onChange={this.handleChange} />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="weight">
                Weight
              </label>
              <input className="form__input" type="text" placeholder="Weight" name="weight" value={this.state.weight} onChange={this.handleChange} />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="size">
                Size
              </label>
              <input className="form__input" type="text" placeholder="Size" name="size" value={this.state.size} onChange={this.handleChange} />
            </div>
            <div className="form__buttons">
              <a className="form__button form__button--secondary" onClick={this.props.closeEditForm}>
                <i className="fas fa-minus-circle" /> Hide form
              </a>
              <button className="form__button">
                <i className="far fa-save" /> Save changes
              </button>
            </div>
          </form>
        </div>
      </div>;
  }
}

export default EditForm;