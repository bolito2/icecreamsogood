// React imports
import React, { useEffect, useState } from "react";
import './App.css';
import { Button, Grid } from "@mui/material";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://ice-cream-so-good-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function App() {
  const [count , setCount] = useState(0);
  
  useEffect(() => {
    const iceCreamCountRef = ref(database, 'ice_cream/count');
    onValue(iceCreamCountRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
    });
  }, []);

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
