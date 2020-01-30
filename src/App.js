import React, {Component} from 'react';
import './css/layout.css';
import './css/style.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import HomeScreen from './components/home_screen/HomeScreen';
import HostScreen from './components/host_screen/HostScreen';
import TopicScreen from './components/topic_screen/TopicScreen';
import Data from './data_classes/Data';

export const default_json = 
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

  setJson = (json) => {
    let dict = JSON.parse(json);
    let topics = dict.topics;
    let t = [];
    topics.map(topic => {
      if ((topic.paradigm === "pubsub" && (topic.pub !== "" || topic.sub.length > 0))
          || (topic.paradigm === "reqrep" && (topic.req !== "" || topic.rep !== ""))) {
        console.log("SDfsf");
        t.push(topic);
        }
    });
    dict.topics = t;
    this.setState({json: JSON.stringify(dict)});
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
