import React from 'react';
import classes from './ProductSingle.css';

const ProductSingle = (props) => {
    return (
        <div className="product-single">
            <img className="product-single__image" src={props.product.imageLink} alt={props.product.name} />
            <div className="product-single__details">            
                <h2 className="product-single__headline">
                    <span className="product-single__name__brand">{props.product.brand}</span> <span className="product-single__name">{props.product.name}</span>
                </h2>
                <p className="product-single__price">{props.product.price}</p>
                <div className="product-single__details__specs">
                    <ul>
                        {"battery" in props.product && props.product.battery.length > 0 ? <li>Battery: {props.product.battery}</li> : null}
                        {"camera" in props.product && props.product.camera.length > 0 ? <li>Camera: {props.product.camera}</li> : null}
                        {"size" in props.product && props.product.size.length > 0 ? <li>Size: {props.product.size}</li> : null}
                        {"weight" in props.product && props.product.weight.length > 0 ? <li>Weight: {props.product.weight}</li> : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductSingle;