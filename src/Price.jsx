import { Component } from "react";

class Price extends Component {
  render() {
    return <span>{this.props.productPrice}</span>;
  }
}

export default Price;
