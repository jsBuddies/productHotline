import React from 'react';
import classes from './ProductSingle.css';
import firebase from 'firebase';

class ProductSingle extends React.Component {
    constructor() {
        super();
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        const productId = this.props.match.params.productId;
        this.productDbRef = firebase.database().ref(`products/${productId}`);
        this.productDbRef.on("value", snapshot => {
            const product = snapshot.val();
            this.setState({
                product
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.product !== null && <div className="product-single">
                    <img className="product-single__image" src={this.state.product.imageLink} alt={this.state.product.name} />
                    <div className="product-single__details">
                        <h2 className="product-single__headline">
                            <span className="product-single__name__brand">{this.state.product.brand}</span> <span className="product-single__name">{this.state.product.name}</span>
                        </h2>
                        <p className="product-single__price">${this.state.product.price}</p>
                        <div className="product-single__details__specs">
                            <ul>
                                {"battery" in this.state.product && this.state.product.battery.length > 0 ? <li>Battery: {this.state.product.battery}</li> : null}
                                {"camera" in this.state.product && this.state.product.camera.length > 0 ? <li>Camera: {this.state.product.camera}</li> : null}
                                {"size" in this.state.product && this.state.product.size.length > 0 ? <li>Size: {this.state.product.size}</li> : null}
                                {"weight" in this.state.product && this.state.product.weight.length > 0 ? <li>Weight: {this.state.product.weight}</li> : null}
                            </ul>
                        </div>
                    </div>
                </div>}
                {typeof this.state.product === 'undefined' && <div className="error-message">Nothing to see here</div>}
            </React.Fragment>
        )
    }
}

export default ProductSingle;