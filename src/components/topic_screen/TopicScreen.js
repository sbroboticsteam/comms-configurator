import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';
import DeleteTopicModal from '../modals/DeleteTopicModal';

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

    handleChangeProtocol = (e) => {
        let value = e.target.options[e.target.selectedIndex].value;
        let newDict = JSON.parse(this.state.json);
        let topic = newDict.topics.find((t) => t.id === this.props.id);
        topic.protocol = value;
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

    pub_section = (pub) => { return this.host_section(pub, "Publisher"); }
    rep_section = (rep) => { return this.host_section(rep, "Responder"); }
    req_section = (req) => { return this.host_section(req, "Requester"); }
    host_section = (host, role) => {
        let hosts = JSON.parse(this.state.json).hosts;
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
                                <option value={host} key={i}>{host}</option>
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
    sub_section = (sub) => {
        let hosts = JSON.parse(this.state.json).hosts;
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
                                <option value={host} key={i}>{host}</option>
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
                    <option value="udp">udp</option>
                    <option value="ipc">ipc (not supported yet)</option>
                    <option value="inproc">inproc (not supported yet)</option>
                </select>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" 
                    value={address} onChange={this.handleChangeAddrPort} />
                {protocol === "tcp" || protocol === "udp" ? (
                    <React.Fragment>
                        <label htmlFor="port">Port</label>
                        <input type="text" id="port" 
                            value={port} onChange={this.handleChangeAddrPort} />
                    </React.Fragment>
                ) : null}
                {topic.getParadigm() === "pubsub" ? this.pub_section(pub) : this.rep_section(rep)}
                {topic.getParadigm() === "pubsub" ? this.sub_section(sub) : this.req_section(req)}
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