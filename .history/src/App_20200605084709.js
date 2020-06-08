import React from 'react';
import './assets/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./pages/homepage";

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Homepage}></Route>
      </Router>
    </div>
  );
}

export default App;
