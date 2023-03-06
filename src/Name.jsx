import { Component } from "react";

class Name extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>{this.props.productName}</h1>;
  }
}

export default Name;
