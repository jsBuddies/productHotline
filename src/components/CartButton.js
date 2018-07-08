import React from "react";

const CartButton = (props) => {
    const button = (props.cartStatus === false ? <button className="cart-button" onClick={props.cartClick}><i className="fas fa-shopping-cart" /><span className="visually-hidden">Items in cart:</span> {props.totalCartArray.length > 0 ? <span className="cart-button__items">{props.totalCartArray.length}</span> : null}</button> : <button className="cart-button" onClick={props.cartClick}><i className="fas fa-shopping-cart" /> Close Cart</button>);

    return ( button )
}


export default CartButton;