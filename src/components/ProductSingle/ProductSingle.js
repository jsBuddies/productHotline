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
    return <React.Fragment>
        {this.state.product !== null && <div className="product-single">
            <img className="product-single__image" src={this.state.product.imageLink} alt={this.state.product.name} />
            <div className="product-single__details">
              <h2 className="product-single__headline">
                <span className="product-single__name__brand">
                  {this.state.product.brand}
                </span>
                <span className="product-single__name">
                  {this.state.product.name}
                </span>
              </h2>
              <p className="product-single__price">
                <span class="product-single__price__currency">$</span>
                {this.state.product.price}
              </p>
              {addToCartBtn}
              <div>
                <ul className="product-single__specs-list">
                  {"battery" in this.state.product && this.state.product.battery.length > 0 ? <li className="product-single__specs-list__item">
                      <span className="product-single__details__label">
                        Battery:{" "}
                      </span> {this.state.product.battery}
                    </li> : null}
                  {"camera" in this.state.product && this.state.product.camera.length > 0 ? <li className="product-single__specs-list__item">
                      <span className="product-single__details__label">
                        Camera:{" "}
                      </span>
                      {this.state.product.camera}
                    </li> : null}
                  {"size" in this.state.product && this.state.product.size.length > 0 ? <li className="product-single__specs-list__item">
                      <span className="product-single__details__label">
                        Size:{" "}
                      </span>
                      {this.state.product.size}
                    </li> : null}
                  {"weight" in this.state.product && this.state.product.weight.length > 0 ? <li className="product-single__specs-list__item">
                      <span className="product-single__details__label">
                        Weight:{" "}
                      </span>
                      {this.state.product.weight}
                    </li> : null}
                </ul>
              </div>
            </div>
          </div>}
        {typeof this.state.product === "undefined" && <div className="error-message">
            Nothing to see here
          </div>}
      </React.Fragment>;
  }
}

export default ProductSingle;
