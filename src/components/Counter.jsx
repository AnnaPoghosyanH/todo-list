import { useState } from "react";

function Counter(){
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  let signNegOrPos;
  if (count > 0) {
    signNegOrPos = "Positive";
  } else if (count < 0) {
    signNegOrPos = "Negative";
  } else {
    signNegOrPos = "Zero";
  }
  return (
    <div className="m-5">
      <button className="btn btn-primary m-2" onClick={increment}> + </button>
      <span className="m-2">{count}</span>
      <button className="btn btn-danger" onClick={decrement}> - </button>
      <div>{signNegOrPos}</div>
    </div>
  );
}

export default Counter;
