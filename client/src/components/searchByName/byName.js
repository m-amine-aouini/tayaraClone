import React, { Component } from 'react';
import productsServices from './../../services/productServices';
import Search from './../searchBar/search';

class ByName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    onRetreive(data) {
        this.setState({ products: data }) // set state products to data parameter
    }

    componentWillMount() {
        let name = sessionStorage.getItem('-----------________search') // set name variable to products user searching for
        productsServices.byNameProducts(name, this.onRetreive.bind(this)) // make http request to retreive data
    }

    onclick(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <Search />
                <div id="searchProds" style={{ marginLeft: '480px', backgroundColor: "white", borderRadius: "3%", marginTop: "15px", width: "350px" }}>
                    {
                        this.state.products.map((product, i) => {
                            return (
                                <div key={i} id={product._id} style={{ width: "350px" }} className="seachProd" onClick={this.onclick.bind(this)}>
                                    <img src={product.image} style={{ width: "330px", marginTop: "10px" }} className="searchProdsImgs" alt="product image" ></img>
                                    <h3>{product.cost} DT</h3>
                                    <h4>{product.name}</h4>
                                    <p>Stock: {product.stockCondition} | Delivery: {product.deliveryCondition}</p>
                                    <p>{product.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        )
    }
}

export default ByName;