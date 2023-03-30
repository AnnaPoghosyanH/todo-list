import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./components/todo/ToDo";
import "./App.css";

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
