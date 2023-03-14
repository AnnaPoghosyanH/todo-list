import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./ToDo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDo />
      </div>
    );
  }
}

export default App;
