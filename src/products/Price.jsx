import { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.textPrice,
      currency: this.props.textCurrency,
      exchangeRate: 391,
    };
  }

  changeCurrency = () => {
    this.setState((state, props) => {
      return state.currency === "$"
        ? { price: state.price * state.exchangeRate, currency: "֏" }
        : { price: state.price / state.exchangeRate, currency: "$" };
    });
  };

  render() {
    return (
      <span>
        {this.state.price} {this.state.currency}
        <button onClick={this.changeCurrency}>Change the currency</button>
      </span>
    );
  }
}

export default Price;
