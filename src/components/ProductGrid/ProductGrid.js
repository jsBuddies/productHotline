import React from 'react';
import classes from './ProductGrid.css';
import { Link } from 'react-router-dom';

class ProductGrid extends React.Component {
    constructor(){
        super();

    }

    addToCart = (e) => {
        const itemIndex = e.currentTarget.parentElement.attributes.index.value;
        this.props.setCartProductGridCallBack(itemIndex);
    }
    
    render() {
        const addToCartBtn = this.props.loggedIn === false ? <button onClick={this.addToCart} >Add to Cart</button> : null;
        return (
            <div className="product-grid__container">
                <h2 className="product-grid__headline">Products</h2>
                <ul className="product-grid">
                    {this.props.products !== null ? Object.keys(this.props.products).sort().reverse().map((key) => {
                        return (
                            <li className="product" key={key} index={key}>
                                <Link to={`/products/${key}`} className="product__image__link">
                                    <img className="product__image" src={this.props.products[key].imageLink} alt={this.props.products[key].name} />
                                </Link>
                                <h3 className="product__headline">
                                    <Link className="product__name__link" to={`/products/${key}`}>
                                        <span className="product__name__brand">{this.props.products[key].brand}</span> <span className="product__name">{this.props.products[key].name}</span>
                                    </Link>
                                </h3>
                                <p className="product__price">
                                    <span className="product__price__currency">
                                        $
                                    </span>
                                    {this.props.products[key].price}
                                </p>
                                {this.props.currentUserRole === "admin" && <div className="product__buttons">
                                    <button className="product__button" onClick={() => this.props.removeItem(key)}>
                                        <i className="far fa-times-circle" /> Remove
                                    </button>
                                    <button className="product__button" onClick={() => this.props.editItem(key)}>
                                        <i className="far fa-edit" /> Edit
                                    </button>
                                </div>}
                                {addToCartBtn}
                            </li>
                        )
                    }) : null}
                </ul>
            </div>
        )
    }
}

export default ProductGrid;