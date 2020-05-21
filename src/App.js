import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import HomePage from "./components/Homepage/homepage";
import Artistregister from "./components/register/artist/artistRegister";
import Buyerregister from "./components/register/buyer/buyerRegister";
import { memoryHistory, browserHistory } from "./helpers/history";

import videoPlayer from './components/login/videoPlayer';

function App() {
  return (
    <React.Fragment>
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/buyer-registration" component={Buyerregister} />
          <Route exact path="/artist-registration" component={Artistregister} />
          <Route exact path="/demo-video" component={videoPlayer} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
