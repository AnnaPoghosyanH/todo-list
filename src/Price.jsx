import { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <span>{this.props.productPrice}</span>;
  }
}

export default Price;
