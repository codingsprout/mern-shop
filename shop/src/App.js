import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Servicelist from './pages/Servicelist/Servicelist';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/:slug' component={Servicelist} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
