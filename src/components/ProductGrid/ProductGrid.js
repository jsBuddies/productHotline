import React from 'react';
import classes from './ProductGrid.css';

const ProductGrid = (props) => {
    return (
        <div className="product-grid__container">
        <h2 className="product-grid__headline">Products</h2>
            <ul className="product-grid">
                {props.products.map((product, i) => {
                    return (
                    <li className="product" key={i}>
                        <a href={product.link} className="product__image__link">
                            <img className="product__image" src={product.imageLink} alt={product.name} />
                        </a>
                        <h3 className="product__headline">
                            <a className="product__name__link" href={product.link}>
                                <span className="product__name__brand">{product.brand}</span> <span className="product__name">{product.name}</span>
                            </a>
                        </h3>
                        <p className="product__price">{product.price}</p>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ProductGrid;