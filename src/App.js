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
  var [buttons, setButtons] = useState([]);
  // Get the buttons and display them (runs once)
  useEffect(() => {
    const actionsRef = ref(database, 'actions');
    get(actionsRef).then((snapshot) => {
      const data = snapshot.val();
      var newButtons = [];
      for (const key in data) {
        newButtons.push(
          <Grid item xs={6}>
              <Button onClick={() => clickButton(key)} class="button-29">{data[key].emoji}</Button>
          </Grid>
        );
      }
      setButtons(newButtons);
    });
  }, []);

  const [actions , setActions] = useState([]);
  
  useEffect(() => {
    const actionsRef = ref(database, 'actions');
    onValue(actionsRef, (snapshot) => {
      const data = snapshot.val();
      var newActions = [];
      for (const key in data){
        newActions.push({id: key, emoji: data[key].emoji, count: data[key].count});
      }
      setActions(newActions.sort((a, b) => b.count - a.count));
    });
  }, []);

  const counters = actions.map((action) => {
    return (
      <p>
        {action.emoji} : {action.count}
      </p>
    );
  });

  return (
    <div className="App">
      <body className="App-header">
        <div>
          {counters}
        </div>

        <div>
          <Grid container spacing={2}>
            {buttons}
          </Grid>
        </div>
      </body>
    </div>
  );
  function clickButton(id) {
    console.log(id)
    const actionCountRef = ref(database, 'actions/' + id + '/count');
    get(actionCountRef).then((snapshot) => {
      return snapshot.val();
    }).then((count) => {
      set(actionCountRef, count + 1);
    });
  }
}

export default App;
