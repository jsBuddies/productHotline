import React from 'react';
import classes from './ShoppingCart.css';

class ShoppingCart extends React.Component{
  constructor(){
    super();
  }
  
  render() {
    //maps over all the items
    const cartItems = this.props.totalCartArray.length !== 0 ? this.props.totalCartArray.map((item, index) => {
      const priceToFixed = parseFloat(item.price).toFixed(2);
      return <div key={index} className="cart__item" itemID={item.itemId} index={index}>
          <p>
            {item.name}
          </p>
          <p>${priceToFixed}</p>
        <button className="cart__remove-button" onClick={() => this.props.removeItemCallback(index)}>
          <span className="visually-hidden">
            Remove item
              </span>
          <i className="far fa-times-circle"></i>
        </button>
        </div>;
    }) : <p className="cart__message">No items in shopping cart</p>;

    //display cart items only when cartStatus is true
    const cartItemsDisplay = this.props.cartStatus ? cartItems : null;

    //changes all the strings to numbers before pushing to priceTotal arr for the sum of the total price
    let price =[];
    for (let i = 0; i < this.props.totalCartArray.length; i++){
        price.push(parseFloat(this.props.totalCartArray[i].price))
    };
    const priceTotal = price.reduce((a, b) => a + b, 0).toFixed(2);

    //displays the total price at the end of the cart Comp
    const priceTotalDisplay = this.props.cartStatus && this.props.totalCartArray.length > 0 ? <p className="cart__total">
        <span className="cart__total__label">Total price</span> 
        <span className="cart__total__value">${priceTotal}</span>
      </p> : null;

    return (
      <div className="cart">
        <div className="wrapper">
          <h2 className="cart__heading">Shopping Cart</h2>
          {cartItemsDisplay}
          {priceTotalDisplay}
        </div>
      </div>
    )
  }
}

export default ShoppingCart;