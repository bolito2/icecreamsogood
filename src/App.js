// React imports
import React, { useEffect, useState } from "react";
import './App.css';
import { Button, Grid, IconButton, SvgIcon } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ActionChip from "./ActionChip";


// Firebase imports
import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  databaseURL: "https://ice-cream-so-good-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Time in milliseconds that a click is considered "recent"
const fadingTime = 2500;

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
          <Grid item xs={3}>
              <IconButton onClick={() => clickButton(key)} class="button-29"><img src={"./icons/" + data[key].emoji}/></IconButton>
          </Grid>
        );
      }
      setButtons(newButtons);
    });
  }, []);

  // Get counts and display them (runs every time the database changes)
  const [actions , setActions] = useState([]);
  
  useEffect(() => {
    const actionsRef = ref(database, 'actions');
    onValue(actionsRef, (snapshot) => {
      const data = snapshot.val();
      var newActions = [];
      for (const key in data){
        let count = 0;
        if (data[key].clicks) {
          // Only count clicks that are less than 2.5s old
          const timestamps = Object.values(data[key].clicks).map(click => click.timestamp);
          count = timestamps.filter((timestamp) => Date.now() - timestamp < fadingTime).length;
        }
        if(count > 0){
          newActions.push({id: key, emoji: data[key].emoji, count: count});
        }
      }
      setActions(newActions.sort((a, b) => b.count - a.count));
    });
  }, []);

  const counters = actions.map((action) => {
    return (
      <ActionChip icon={"./icons/" + action.emoji} text={"  x" + action.count} />
    );
  });

  return (
    <div className="App">
      <body className="App-header">
        <div className="rectangle-area">
          {counters}
        </div>
        
        <div>
          <Grid container spacing={1}>
            {buttons}
          </Grid>
        </div>
      </body>
    </div>
  );
  function clickButton(id) {
    console.log(id)
    const actionCountRef = ref(database, 'actions/' + id + '/clicks');
    const newClickRef = push(actionCountRef, {timestamp: Date.now()});

    // pause for 2.5s
    return setTimeout(() => {
      remove(newClickRef);
    }, fadingTime);
  }
}

export default App;
