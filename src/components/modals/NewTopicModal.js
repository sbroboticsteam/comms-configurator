import React from 'react';
import Modal from './Modal';

const defaultState = {
    id: "",
    paradigm: "pubsub",
    protocol: "tcp",
    pub: "",
    sub: [],
    rep: "",
    req: ""
};

const addrPrefix = {
    ipc: "comms",
    inproc: "foo"
}

class NewTopicModal extends Modal {
    state = defaultState;

    handleIdChange = (e) => {
        let newval = e.target.value;
        this.setState({id: newval});
    }

    handleParadigmSelect = (e) => {
        let newval = e.target.options[e.target.selectedIndex].value;
        if (newval === "pubsub") {
            this.setState({rep: "", req: ""});
        }
        else {
            this.setState({pub: "", sub: []});
        }
        this.setState({paradigm: newval});
    }

    handleProtocolSelect = (e) => {
        let newval = e.target.options[e.target.selectedIndex].value;
        this.setState({protocol: newval});
    }

    handleHostSelect = (e) => {
        let value = e.target.options[e.target.selectedIndex].value;
        if (e.target.id === "input-host-1") {
            if (this.state.paradigm === "pubsub") {
                this.setState({pub: value});
            }
            else {
                this.setState({rep: value});
            }
        }
        else {
            this.setState({req: value});
        }
        
    }

    handleSubSelect = (e) => {
        let newSub = [];
        for(let i=0; i<e.target.selectedOptions.length; i++) {
            newSub.push(e.target.selectedOptions[i].value);
        }
        this.setState({sub: newSub});
    }

    generatePort = () => {
        let topics = this.props.topics;
        let i = 5555;
        for (; i<6000 ; i++) {
            let valid = true;
            topics.map(topic => {
                let protinfo = topic.getProtocolInfo();
                if (protinfo.port === i.toString()) {
                    valid = false;
                }
            });
            if (valid) break;
        }
        return i.toString();
    }

    generateAddr = (protocol) => {
        let topics = this.props.topics;
        let i=0;
        for (i; i<100; i++) {
            let valid = true;
            let match = addrPrefix[protocol] + i.toString();
            topics.map(topic => {
                let protinfo = topic.getProtocolInfo();
                if (protinfo.address === match) {
                    valid = false;
                }
            });
            if (valid) break;
        }
        return addrPrefix[protocol]+i.toString();
    }

    addTopic = () => {
        let newTopic = {};
        newTopic.id = this.state.id;
        newTopic.protocol = this.state.protocol;
        newTopic.paradigm = this.state.paradigm;
        if (newTopic.protocol === "tcp") {
            newTopic.address = "127.0.0.1";
            newTopic.port = this.generatePort();
        }
        else {
            newTopic.address = this.generateAddr(newTopic.protocol);
        }
        if (newTopic.paradigm === "pubsub") {
            newTopic.pub = this.state.pub;
            newTopic.sub = this.state.sub;
        }
        else {
            newTopic.rep = this.state.rep;
            newTopic.req = this.state.req;
        }
        this.props.addTopic(newTopic);
        this.clearFields();
    }

    clearFields = () => {
        this.setState(defaultState);
    }

    render() {
        let hosts = this.props.hosts;
        return (
            <React.Fragment>
                <a className="btn-floating waves-effect waves-light modal-trigger" data-target="newtopic">
                    <i className="material-icons">add</i>
                </a>
                <div id="newtopic" className="modal" ref={Modal => this.Modal = Modal}>
                    <div className="modal-content">
                        <h5>New Topic</h5>
                        <label htmlFor="input-topicid">Topic ID</label>
                        <input value={this.state.id} type="text" id="input-topicid" onChange={this.handleIdChange}/>
                        <label htmlFor="input-paradigm">Paradigm</label>
                        <select className="browser-default" id="input-paradigm" onChange={this.handleParadigmSelect}>
                            <option value="pubsub">pubsub</option>
                            <option value="reqrep">reqrep</option>
                        </select>
                        <br />
                        <label htmlFor="input-host-1">{this.state.paradigm === "pubsub" ? "Publisher" : "Responder"}</label>
                        <select value={this.state.paradigm === "pubsub" ? this.state.pub : this.state.rep}
                            className="browser-default" id="input-host-1" onChange={this.handleHostSelect}>
                            <option value="" disabled hidden>Select...</option>
                            {hosts.map((host, i) => (
                                <option value={host} key={i}>{host}</option>
                            ))}
                        </select>
                        <br />
                        <label htmlFor="input-host-2">{this.state.paradigm === "pubsub" ? "Subscribers" : "Requester"}</label>
                        {this.state.paradigm === "pubsub" ? (
                            <select multiple className="browser-default" id="input-host-2" style={{height: "60px"}} 
                            onChange={this.handleSubSelect}>
                                {hosts.map((host, i) => (
                                    <option value={host} key={i}>{host}</option>
                                ))}
                            </select>
                        ) : (
                            <select value={this.state.req} className="browser-default" 
                                id="input-host-2" onChange={this.handleHostSelect}>
                                <option value="" disabled hidden>Select...</option>
                                {hosts.map((host, i) => (
                                    <option value={host} key={i}>{host}</option>
                                ))}
                            </select>
                        )}
                        <br />
                        <label htmlFor="input-protocol">Protocol</label>
                        <select value={this.state.protocol} className="browser-default" id="input-protocol" onChange={this.handleProtocolSelect}>
                            <option value="tcp">tcp</option>
                            <option value="ipc">ipc</option>
                            <option value="inproc">inproc (not supported yet)</option>
                        </select>
                        <br />
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat" onClick={this.addTopic}>Add</a>
                        <a href="#!" className="modal-close btn-flat" onClick={this.clearFields}>Cancel</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NewTopicModal;