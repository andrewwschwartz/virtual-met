// React and other foundational library imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppData } from './AppData';

//css imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//local imports
import Department from './Department.js'
import Header from './Header.js'
import Home from './Home.js'
import ObjectDisplay from './Object.js'
import useFetch from './Hooks';

function App() {  
  
  const appData = useFetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );

  return (
    <Router>
      <AppData.Provider value={appData}>
        <div className="App">
          <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/department/:id">
                <Department />
              </Route>
              <Route path="/object/:id">
                <ObjectDisplay />
              </Route>
            </Switch>
        </div>
      </AppData.Provider>
    </Router>
  );
}

export default App;
