import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';
import DeleteTopicModal from '../modals/DeleteTopicModal';

const addrPrefix = {
    ipc: "comms",
    inproc: "foo"
}

class TopicScreen extends Component {
    state = {
        edited: false,
        edit_host: null,
        json: this.props.json,
        deleted: false
    }

    setName = (e) => {
        let name = e.target.innerHTML;
        this.props.setName(name);
    }

    editHost = (e) => {
        let id = e.target.id;
        switch(id) {
            case "edit-Publisher":
                if (this.state.edit_host === "Publisher") {
                    this.setState({edit_host: null});
                }
                else {
                    this.setState({edit_host: "Publisher"});
                }
                break;
            case "edit-Subscribers":
                if (this.state.edit_host === "Subscribers") {
                    this.setState({edit_host: null});
                }
                else {
                    this.setState({edit_host: "Subscribers"});
                }
                break;
            case "edit-Responder":
                if (this.state.edit_host === "Responder") {
                    this.setState({edit_host: null});
                }
                else {
                    this.setState({edit_host: "Responder"});
                }
                break;
            case "edit-Requester":
                if (this.state.edit_host === "Requester") {
                    this.setState({edit_host: null});
                }
                else {
                    this.setState({edit_host: "Requester"});
                }
                break;
            default: break;
        }
    }

    deleteTopic = () => {
        let newDict = JSON.parse(this.props.json);
        newDict.topics = newDict.topics.filter(topic => (topic.id !== this.props.id));
        this.setState({deleted: true});
        this.props.setJson(JSON.stringify(newDict));
    }

    save = () => {
        this.setState({edited: false});
        this.setState({edit_host: null});
        this.props.setJson(this.state.json);
    }

    setEdited = () => {
        this.setState({edited: true});
    }

    generateAddr = (protocol) => {
        let data = new Data(JSON.parse(this.state.json));
        let topics = data.getTopics();
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

    generatePort = () => {
        let data = new Data(JSON.parse(this.state.json));
        let topics = data.getTopics();
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

    handleChangeProtocol = (e) => {
        let value = e.target.options[e.target.selectedIndex].value;
        let newDict = JSON.parse(this.state.json);
        let topic = newDict.topics.find((t) => t.id === this.props.id);
        topic.protocol = value;
        if (value === "ipc" || value === "inproc") {
            topic.address = this.generateAddr(value);
        } else {
            topic.address = "127.0.0.1";
            topic.port = this.generatePort();
        }
        this.setState({json: JSON.stringify(newDict)});
        this.setEdited();
    }

    handleChangeAddrPort = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let newDict = JSON.parse(this.state.json);
        let topic = newDict.topics.find((t) => t.id === this.props.id);
        if (id === "address") {
            topic.address = value;
        }
        else {
            topic.port = value;
        }
        this.setState({json: JSON.stringify(newDict)});
        this.setEdited();
    }

    handleChangeHost = (e) => {
        let id = e.target.id;
        let value = e.target.options[e.target.selectedIndex].value;
        let newDict = JSON.parse(this.state.json);
        let topic = newDict.topics.find((t) => t.id === this.props.id);
        switch(id) {
            case "select-Publisher":
                topic.pub = value;
                break;
            case "select-Requester":
                topic.req = value;
                break;
            case "select-Responder":
                topic.rep = value;
                break;
            default: break;
        }
        this.setState({json: JSON.stringify(newDict)});
        this.setEdited();
    }
    handleChangeSub = (e) => {
        let id = e.target.id;
        let newDict = JSON.parse(this.state.json);
        let topic = newDict.topics.find((t) => t.id === this.props.id);
        topic.sub = [];
        for(let i=0; i<e.target.options.length; i++) {
            if(e.target.options[i].selected) {
                topic.sub.push(e.target.options[i].value);
            }
        }
        this.setState({json: JSON.stringify(newDict)});
        this.setEdited();
    }

    pub_section = (pub, topic) => { return this.host_section(pub, "Publisher", topic); }
    rep_section = (rep, topic) => { return this.host_section(rep, "Responder", topic); }
    req_section = (req, topic) => { return this.host_section(req, "Requester", topic); }
    host_section = (host, role, topic) => {
        let hosts = JSON.parse(this.state.json).hosts;
        let topic_hosts = topic.getHosts();
        let hostsToOmit = [];
        if (role === "Publisher") hostsToOmit = topic_hosts.sub;
        else if (role === "Responder") hostsToOmit.push(topic_hosts.req);
        else if (role === "Requester") hostsToOmit.push(topic_hosts.rep);
        return (
            <React.Fragment>
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">{role+":"}</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editHost}>
                        <i id={"edit-"+role} className="material-icons">edit</i>
                    </a>
                </div>
                {this.state.edit_host === role ? (
                    <div>
                        <select defaultValue={host} id={"select-"+role} className="browser-default" onChange={this.handleChangeHost}>
                            {hosts.map((host, i) => (
                                !hostsToOmit.includes(host) ? <option value={host} key={i}>{host}</option> : null
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="hostlink">
                        <Link to={'/host/'+host} onClick={this.setName}>
                            {host}
                        </Link>
                    </div>
                )}
            </React.Fragment>
        );
    }
    sub_section = (sub, topic) => {
        let hosts = JSON.parse(this.state.json).hosts;
        let hostToOmit = topic.getHosts().pub;
        return (
            <React.Fragment>
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">Subscribers:</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editHost}>
                        <i id="edit-Subscribers" className="material-icons">edit</i>
                    </a>
                </div>
                {this.state.edit_host === "Subscribers" ? (
                    <div>
                        <select multiple className="browser-default" style={{height: "150px", fontSize: "16px"}} onChange={this.handleChangeSub}>
                            {hosts.map((host, i) => (
                                hostToOmit !== host ? <option value={host} key={i}>{host}</option> : null
                            ))}
                        </select>
                    </div>
                ) : (
                    sub.map((host, i) => (
                        <React.Fragment key={i}>
                            <div className="hostlink">
                                <Link to={'/host/'+host} onClick={this.setName} key={i}>
                                    {host}
                                </Link>
                            </div>
                            <br />
                        </React.Fragment>
                    ))
                )}
            </React.Fragment>
        );
    }
    
    render() {
        if (!this.state.json) return null;
        if(this.state.deleted) return <Redirect to="/"/>
        let data = new Data(JSON.parse(this.state.json));
        let topic = data.getTopics().find((t) => t.getId() === this.props.id);
        if (!topic) return <Redirect to="/" />
        let hosts = topic.getHosts();
        let {pub, sub, req, rep} = hosts;
        let protocolinfo = topic.getProtocolInfo();
        let {protocol, address, port} = protocolinfo;
        return (
            <div className="container">
                <div className="topicscreen_title">
                    <h3 className="leftfloat">{this.props.id}</h3>
                    <DeleteTopicModal deleteTopic={this.deleteTopic.bind(this)}/>
                </div>
                <span>Paradigm:  {topic.getParadigm()}</span><br/><br/>
                
                <label htmlFor="protocol">Protocol</label>
                <select value={protocol} className="browser-default" id="protocol" onChange={this.handleChangeProtocol}>
                    <option value="tcp">tcp</option>
                    <option value="ipc">ipc (not supported yet)</option>
                    <option value="inproc">inproc</option>
                </select>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" disabled={protocol === "ipc" ? "disabled" : ""}
                    value={address} onChange={this.handleChangeAddrPort} />
                {protocol === "tcp" ? (
                    <React.Fragment>
                        <label htmlFor="port">Port</label>
                        <input type="text" id="port" 
                            value={port} onChange={this.handleChangeAddrPort} />
                    </React.Fragment>
                ) : null}
                {topic.getParadigm() === "pubsub" ? this.pub_section(pub, topic) : this.rep_section(rep, topic)}
                {topic.getParadigm() === "pubsub" ? this.sub_section(sub, topic) : this.req_section(req, topic)}
                <br />
                {this.state.edited ? (
                    <a className="btn waves-effect waves-light pink" onClick={this.save}>
                        Save Changes
                    </a>
                ) : null}
            </div>
        );
    }

}

export default TopicScreen;