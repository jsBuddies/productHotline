import React from 'react';

class ShoppingCart extends React.Component{
  constructor(){
    super();

    this.state = {
      cartStatus: false
    }
  }
  
  cartClick = () => {
    this.setState({
      cartStatus: !this.state.cartStatus
    })
  }

  render() {
    // const cartArray = this.props.cartArray;
    // const cartProductGridArray = this.props.cartProductGridArray;

    // //adds the two arrays from ProductSingle Comp and the ProductGrid Comp
    // const totalArray = cartArray.concat(cartProductGridArray);
    
    //maps over all the items
    const cartItems = this.props.totalCartArray.length !== 0 ? this.props.totalCartArray.map((item, index) => {
      return <div key={index} className="cartItem" itemID={item.itemId}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <button onClick={this.props.removeItemCallback}>
            Remove item
          </button>
        </div>;
    }) : <p>No items in shopping cart</p>;

    //display cart items only when cartStatus is true
    const cartItemsDisplay = this.state.cartStatus ? cartItems : null;

    //cartButton comp with item total
    const cartButton = !this.state.cartStatus ? <button onClick={this.cartClick} >{`Items total: ${this.props.totalCartArray.length}`}</button> : <button onClick={this.cartClick} >Close Cart</button>;

    //changes all the strings to numbers before pushing to priceTotal arr for the sum of the total price
    let price =[];
    for (let i = 0; i < this.props.totalCartArray.length; i++){
        price.push(parseFloat(this.props.totalCartArray[i].price))
    };
    const priceTotal = price.reduce((a, b) => a + b, 0).toFixed(2);

    //displays the total price at the end of the cart Comp
    const priceTotalDisplay = this.state.cartStatus ? <p>Total price: ${priceTotal}</p> : null;

    return (
      <React.Fragment>
        {cartButton}
        {cartItemsDisplay}
        {priceTotalDisplay}
      </React.Fragment>
    )
  }
}

export default ShoppingCart;