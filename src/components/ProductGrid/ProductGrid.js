import React from 'react';
import classes from './ProductGrid.css';

const ProductGrid = (props) => {    
    return (
        <div className="product-grid__container">
        <h2 className="product-grid__headline">Products</h2>
            <ul className="product-grid">
                    {props.products !== null ? Object.keys(props.products).sort().reverse().map((key) => {
                    return (
                    <li className="product" key={key} index={key} >
                        <a href={`/products/${key}`} className="product__image__link">
                            <img className="product__image" src={props.products[key].imageLink} alt={props.products[key].name} />
                        </a>
                        <h3 className="product__headline">
                            <a className="product__name__link" href={`/products/${key}`}>
                                <span className="product__name__brand">{props.products[key].brand}</span> <span className="product__name">{props.products[key].name}</span>
                            </a>
                        </h3>
                        <p className="product__price">${props.products[key].price}</p>
                        {props.currentUserRole === 'admin' && <button onClick={() => props.removeItem(key)}>Remove</button>}
                    </li>
                    )
                }) : null}
            </ul>
        </div>
    )
}

export default ProductGrid;