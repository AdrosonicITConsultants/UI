import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import HomePage from "./components/Homepage/homepage";
import { memoryHistory, browserHistory } from "./helpers/history";

function App() {
  return (
    
    <React.Fragment>
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
