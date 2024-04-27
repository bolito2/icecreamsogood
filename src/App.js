// React imports
import React, { useEffect, useState } from "react";
import './App.css';
import { Button, Grid } from "@mui/material";

// Firebase imports
import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, set } from "firebase/database";

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
    const iceCreamCountRef = ref(database, 'actions/ice_cream/count');
    onValue(iceCreamCountRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
    });
  }, []);

  const buttons = [];
  useEffect(() => {
    const actionsRef = ref(database, 'actions');
    get(actionsRef).then((snapshot) => {
      const data = snapshot.val();
      console.log(data)
      for (const key in data) {
        console.log(key)
        console.log(data[key])
        buttons.push(
          <Grid item xs={8}>
              <Button onClick={clickButton} class="button-29">{data[key].emoji}</Button>
          </Grid>
        );
      }
      console.log(buttons)
    });
  }, []);

  return (
    <div className="App">
      <body className="App-header">
        <div>
          <Grid container spacing={2}>
            {buttons}
          </Grid>
        </div>
      </body>
    </div>
  );
  function clickButton() {
    set(ref(database, 'actions/ice_cream/count'), count + 1);
  }
}

export default App;
