import React, {Component} from 'react';
import './css/layout.css';
import './css/style.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import HomeScreen from './components/home_screen/HomeScreen';
import HostScreen from './components/host_screen/HostScreen';
import TopicScreen from './components/topic_screen/TopicScreen';

const default_json = 
'{\
  "hosts": [],\
  "topics": []\
}';

class App extends Component {
  state = {
    json: default_json,
    name: null,
    id: null
  }

  setJson = (value) => {
    this.setState({json: value});
  }

  setName = (name) => {
    this.setState({name: name});
  }

  setId = (id) => {
    this.setState({id: id});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav className="nav-wrapper grey darken-3">
            <div className="container">
              <Link to="/" className="brand-logo">Comms Configurator</Link>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" 
              component={() => <HomeScreen json={this.state.json} setJson={this.setJson.bind(this)} setName={this.setName.bind(this)} setId={this.setId.bind(this)} />} />
            <Route path="/host/:name" component={() => <HostScreen json={this.state.json} setJson={this.setJson.bind(this)} name={this.state.name} setId={this.setId.bind(this)} />} />
            <Route path="/topic/:id" component={() => <TopicScreen json={this.state.json} setJson={this.setJson.bind(this)} id={this.state.id} setName={this.setName.bind(this)} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
