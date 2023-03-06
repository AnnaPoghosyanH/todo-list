import { Component } from "react";
import Name from "./Name";
import Price from "./Price";
import Description from "./Description";

class Product extends Component {
  render() {
    return (
      <div>
        <Name productName={this.props.name} />
        <Price productPrice={this.props.price} />
        <Description productDescription={this.props.description} />
      </div>
    );
  }
}

export default Product;
