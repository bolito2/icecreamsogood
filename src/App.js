import React, { useState } from "react";
import './App.css';
import { Button, Grid } from "@mui/material";

function App() {
  const [count , setCount] = useState(0);
  
  return (
    <div className="App">
      <body className="App-header">
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button onClick={clickButton} class="button-29">{count}</Button>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={clickButton} class="button-29">{count}</Button>
            </Grid>
          </Grid>
        </div>
      </body>
    </div>
  );
  function clickButton() {
    setCount(count + 1);
  }
}

export default App;
