import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';
import Host from '../../data_classes/Host';
import Topic from '../../data_classes/Topic';
import HostsList from './hosts_list/HostsList';
import TopicsList from './topics_list/TopicsList';
import {default_json} from '../../App';
import ClearConfigsModal from '../modals/ClearConfigsModal';

class HomeScreen extends Component {
    
    clear = () => {
        this.props.setJson(default_json);
    }

    upload = () => {
        let selectedfiles = document.getElementById("fileselect").files;
        if (selectedfiles.length == 0) return;
        let selected = selectedfiles[0];
        let reader = new FileReader();
        reader.readAsText(selected, "UTF-8");
        reader.onload = (e) => {
            this.props.setJson(e.target.result);
        }
    }

    copy = () => {
        let text = document.getElementById("json-text");
        text.select();
        document.execCommand("copy");
    }

    addHost = (name) => {
        let newdict = JSON.parse(this.props.json);
        newdict.hosts.push(name);
        let newjson = JSON.stringify(newdict);
        this.props.setJson(newjson);
    }

    addTopic = (topic) => {
        let newdict = JSON.parse(this.props.json);
        newdict.topics.push(topic);
        let newjson = JSON.stringify(newdict);
        this.props.setJson(newjson);
    }

    render() {
        let data = {hosts: null, topics: null};
        if (this.props.json) {
            data = new Data(JSON.parse(this.props.json));
        }
        return (
            <div className="home-screen">
                <div className="toolbar grey lighten-4">
                    <ClearConfigsModal clear={this.clear.bind(this)} />
                    <div className="toolbar-file">
                        <input id="fileselect" type='file' accept=".json"></input>
                        <a className="waves-effect waves-light btn-small open-button" onClick={this.upload}>Load from File</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col m3 list grey lighten-5">
                        <h5>Hosts</h5>
                        <HostsList hosts={data.hosts} setName={this.props.setName} addHost={this.addHost.bind(this)} />
                    </div>
                    <div className="col m9 list">
                        <h5>Topics</h5>
                        <TopicsList topics={data.topics} setId={this.props.setId} hosts={JSON.parse(this.props.json).hosts} addTopic={this.addTopic.bind(this)} />
                    </div>
                </div>
                <div id="json-display">
                    <h5>JSON:</h5>
                    <a className="btn-small waves-effect waves-light" onClick={this.copy}>Copy to Clipboard</a>
                    <textarea id="json-text" readOnly value={this.props.json ? this.props.json : ""} />
                </div>
            </div>
        );
    }
}

export default HomeScreen;