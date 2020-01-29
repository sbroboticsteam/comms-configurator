import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';
import Host from '../../data_classes/Host';
import Topic from '../../data_classes/Topic';
import HostsList from './hosts_list/HostsList';
import TopicsList from './topics_list/TopicsList';

class HomeScreen extends Component {
    
    click() {
        console.log("SDFSD")
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

    render() {
        let data = {hosts: null, topics: null};
        if (this.props.json) {
            data = new Data(JSON.parse(this.props.json));
        }
        return (
            <div className="home-screen">
                <div className="toolbar grey lighten-4">
                    <a className="waves-effect waves-light btn-small toolbar-buttons modal-trigger" onClick={this.click}>New</a>
                    <a className="waves-effect waves-light btn-small toolbar-buttons modal-trigger" onClick={this.click}>Download</a>
                    <div className="toolbar-file">
                        <input id="fileselect" type='file' accept=".json"></input>
                        <a className="waves-effect waves-light btn-small open-button" onClick={this.upload}>Upload</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col m4 list grey lighten-5">
                        <h5>Hosts</h5>
                        <HostsList hosts={data.hosts} setName={this.props.setName} />
                    </div>
                    <div className="col m8 list">
                        <h5>Topics</h5>
                        <TopicsList topics={data.topics} setId={this.props.setId} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeScreen;