import React from "react";
import classes from "./ProductSingle.css";
import firebase from "firebase";

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      singleCart: []
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.productDbRef = firebase.database().ref(`products/${productId}`);
    this.productDbRef.on("value", snapshot => {
      const product = snapshot.val();
      this.setState({
        product
      });
    });
  }

  addToCart = () => {
    const item = this.state.product;
    let singleCartClone = [...this.state.singleCart];
    singleCartClone.push(item);

    this.setState({
      singleCart: singleCartClone
    }, () => {
      this.props.setCartCallback(this.state.singleCart);
    })
  }

  render() {
    const addToCartBtn = this.props.loggedIn === false ? <button onClick={this.addToCart} >Add To Cart</button> : null;
    return (
      <React.Fragment>
        <div className="productSingleContainer">
          <div className="wrapper">
            {this.state.product !== null && (
            <div className="product-single">
                <img
                className="product-single__image"
                src={this.state.product.imageLink}
                alt={this.state.product.name}
                />
                <div className="product-single__details">
                <h2 className="product-single__headline">
                    <span className="product-single__name__brand">
                    {this.state.product.brand}
                    </span>{" "}
                    <span className="product-single__name">
                    {this.state.product.name}
                    </span>
                </h2>
                <p className="product-single__price">
                    <span className='priceTag'>$</span>{this.state.product.price}
                </p>
                {addToCartBtn}
                <div className="product-single__details__specs">
                    <ul>
                    {"battery" in this.state.product &&
                    this.state.product.battery.length > 0 ? (
                        <li><span className='label'> Battery:</span> <span className='value'>{this.state.product.battery}</span></li>
                    ) : null}
                    {"camera" in this.state.product &&
                    this.state.product.camera.length > 0 ? (
                        <li><span className='label'> Camera:</span> <span className='value'>{this.state.product.camera}</span></li>
                    ) : null}
                    {"size" in this.state.product &&
                    this.state.product.size.length > 0 ? (
                        <li><span className='label'> Size:</span> <span className='value'>{this.state.product.size}</span></li>
                    ) : null}
                    {"weight" in this.state.product &&
                    this.state.product.weight.length > 0 ? (
                        <li><span className='label'> Weight:</span> <span className='value'>{this.state.product.weight}</span></li>
                    ) : null}
                    </ul>
                </div>
                </div>
            </div>
            )}
            {typeof this.state.product === "undefined" && (
            <div className="error-message">Nothing to see here</div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductSingle;
