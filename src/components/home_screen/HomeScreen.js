import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';
import Host from '../../data_classes/Host';
import Topic from '../../data_classes/Topic';

class HomeScreen extends Component {
    state = {
        json: null
    }

    click() {
        console.log("SDFSD")
    }

    upload = () => {
        let selectedfiles = document.getElementById("fileselect").files;
        console.log(selectedfiles);
        if (selectedfiles.length == 0) return;
        let selected = selectedfiles[0];
        console.log(selected);
        let reader = new FileReader();
        reader.readAsText(selected, "UTF-8");
        reader.onload = (e) => {
            this.setState({json: e.target.result});
        }
    }

    render() {
        let data = null;
        if (this.state.json) {
            data = new Data(JSON.parse(this.state.json));
        }
        return (
            <div className="home-screen">
                <div className="toolbar grey lighten-4">
                    <a className="waves-effect waves-light btn-small toolbar-buttons modal-trigger" onClick={this.click}>New</a>
                    <a className="waves-effect waves-light btn-small toolbar-buttons modal-trigger" onClick={this.click}>Load</a>
                    <a className="waves-effect waves-light btn-small toolbar-buttons" onClick={this.click}>Save</a>
                    <div className="toolbar-file">
                        <input id="fileselect" type='file' accept=".json"></input>
                        <a className="waves-effect waves-light btn-small open-button" onClick={this.upload}>Upload</a>
                    </div>
                </div>
                <div className="row">
                    <div id="hostlist" className="col m6 list grey lighten-5">
                        {data ? JSON.stringify(data.hosts) : null}
                    </div>
                    <div id="topiclist" className="col m6 list">
                        {data ? JSON.stringify(data.topics) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeScreen;