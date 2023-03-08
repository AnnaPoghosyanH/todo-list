import { Component } from "react";
import "./App.css";
import Product from "./products/Product";

class App extends Component {
  state = {
    amd: 0,
    exchangeRate: 391,
    products: [
      {
        name: "banana",
        price: "5",
        currency: "$",
        description: "Fresh bananas from Ecuador",
      },
      {
        name: "apple",
        price: "8",
        currency: "$",
        description: "Golden apples",
      },
      {
        name: "pear",
        price: "8",
        currency: "$",
        description: "Sweet pears!",
      },
      {
        name: "plum",
        price: "4",
        currency: "$",
        description: "Sweet plums!",
      },
    ],
  };

  handleInputChange = (event) => {
    this.setState({
      amd: event.target.value,
    });
  };

  render(){
    return (
      <div className="App">
        {this.state.products.map((product) => {
          return (
            <Product
              test={false}
              key={product.name}
              name={product.name}
              price={product.price}
              currency={product.currency}
              description={product.description}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
