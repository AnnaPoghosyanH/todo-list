import logo from "./logo.svg";
import "./App.css";
import Product from "./Product";

function App(){
  return (
    <div className="App">
      <Product name="Laptop" price="$1.350" description="Very awesome laptop" />
    </div>
  );
}

export default App;
