import React from 'react';
import './css/layout.css';
import './css/style.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import HomeScreen from './components/home_screen/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="nav-wrapper grey darken-3">
          <div className="container">
            <Link to="/" className="brand-logo">Comms Configurator</Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
