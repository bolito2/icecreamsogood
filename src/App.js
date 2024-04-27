import React, { useState } from "react";
import './App.css';

function App() {
  const [count , setCount] = useState(0);
  
  return (
    <div className="App">
      <body className="App-header">
        <div>
          <button onClick={clickButton} class="button-29">{count}</button>
        </div>
      </body>
    </div>
  );
  function clickButton() {
    setCount(count + 1);
  }
}

export default App;
