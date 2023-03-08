import { Component } from "react";
import Price from "./Price";
import Name from "./Name";
import Description from "./Description";

class Product extends Component {
  render(){
    const { name, price, currency, description } = this.props;
    return (
      <div>
        <Name text={name} />:
        <Price textPrice={price} textCurrency={currency} /> :
        <Description text={description} />
      </div>
    );
  }
}

export default Product;