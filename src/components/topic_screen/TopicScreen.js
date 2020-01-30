import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';

class TopicScreen extends Component {
    state = {
        edited: false
    }

    setName = (e) => {
        let name = e.target.innerHTML;
        this.props.setName(name);
    }

    editPublisher = () => {
        console.log("Editing publisher");
    }

    editSubscribers = () => {
        console.log("Editing subscribers");
    }

    deleteTopic = () => {
        console.log("deleting this topic");
    }

    save = () => {
        console.log("Saving changes")
    }

    pubsub() {
        let data = new Data(JSON.parse(this.props.json));
        let topic = data.getTopics().find((t) => t.getId() === this.props.id);
        let hosts = topic.getHosts();
        let pub = hosts.pub;
        let sub = hosts.sub;
        let protocolinfo = topic.getProtocolInfo();
        let {protocol, address, port} = protocolinfo;
        return (
            <div className="container">
                <div className="topicscreen_title">
                    <h3 className="leftfloat">{this.props.id}</h3>
                    <a className="delete_button btn-floating waves-effect waves-light" onClick={this.deleteTopic}>
                        <i className="material-icons">delete</i>
                    </a>
                </div>
                <span>Paradigm:  {topic.getParadigm()}</span><br/><br/>
                <label htmlFor="protocol">Protocol</label>
                <input type="text" id="protocol" 
                    defaultValue={protocol} />
                <label htmlFor="address">Address</label>
                <input type="text" id="address" 
                    defaultValue={address} />
                {port ? (
                    <React.Fragment>
                        <label htmlFor="port">Port</label>
                        <input type="text" id="port" 
                            defaultValue={port} />
                    </React.Fragment>
                ) : null}
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">Publisher:</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editPublisher}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
                <div className="hostlink">
                    <Link to={'/host/'+pub} onClick={this.setName}>
                        {pub}
                    </Link>
                </div>
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">Subscribers:</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editSubscribers}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
                {sub.map((host, i) => (
                    <React.Fragment key={i}>
                        <div className="hostlink">
                            <Link to={'/host/'+host} onClick={this.setName} key={i}>
                                {host}
                            </Link>
                        </div>
                        <br />
                    </React.Fragment>
                ))}
                {this.state.edited ? (
                    <a className="btn waves-effect waves-light pink" onClick={this.save}>
                        Save Changes
                    </a>
                ) : null}
            </div>
        );
    }

    reqrep() {
        let data = new Data(JSON.parse(this.props.json));
        let topic = data.getTopics().find((t) => t.getId() === this.props.id);
        let hosts = topic.getHosts();
        let rep = hosts.rep;
        let req = hosts.req;
        let protocolinfo = topic.getProtocolInfo();
        let {protocol, address, port} = protocolinfo;
        return (
            <div className="container">
                <div className="topicscreen_title">
                    <h3 className="leftfloat">{this.props.id}</h3>
                    <a className="delete_button btn-floating waves-effect waves-light" onClick={this.deleteTopic}>
                        <i className="material-icons">delete</i>
                    </a>
                </div>
                <span>Paradigm:  {topic.getParadigm()}</span><br/><br/>
                <label htmlFor="protocol">Protocol</label>
                <input type="text" id="protocol" 
                    defaultValue={protocol} />
                <label htmlFor="address">Address</label>
                <input type="text" id="address" 
                    defaultValue={address} />
                {port ? (
                    <React.Fragment>
                        <label htmlFor="port">Port</label>
                        <input type="text" id="port" 
                            defaultValue={port} />
                    </React.Fragment>
                ) : null}
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">Responder:</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editPublisher}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
                <div className="hostlink">
                    <Link to={'/host/'+rep} onClick={this.setName}>
                        {rep}
                    </Link>
                </div>
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">Requester:</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editSubscribers}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
                <div className="hostlink">
                    <Link to={'/host/'+req} onClick={this.setName}>
                        {req}
                    </Link>
                </div>
                {this.state.edited ? (
                    <a className="btn waves-effect waves-light pink" onClick={this.save}>
                        Save Changes
                    </a>
                ) : null}
            </div>
        );
    }

    pub_section = (pub) => { return this.host_section(pub, "Publisher"); }
    rep_section = (rep) => { return this.host_section(rep, "Responder"); }
    req_section = (req) => { return this.host_section(req, "Requester"); }
    host_section = (host, role) => {
        return (
            <React.Fragment>
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">{role+":"}</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editPublisher}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
                <div className="hostlink">
                    <Link to={'/host/'+host} onClick={this.setName}>
                        {host}
                    </Link>
                </div>
            </React.Fragment>
        );
    }

    sub_section = (sub) => {
        return (
            <React.Fragment>
                <div className="topicscreen_hosts_title">
                    <h5 className="leftfloat">Subscribers:</h5> 
                    <a className="topicscreen_hosts_button btn-floating waves-effect waves-light btn-small" onClick={this.editSubscribers}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
                {sub.map((host, i) => (
                    <React.Fragment key={i}>
                        <div className="hostlink">
                            <Link to={'/host/'+host} onClick={this.setName} key={i}>
                                {host}
                            </Link>
                        </div>
                        <br />
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }
    
    render() {
        if (!this.props.json) return null;
        let data = new Data(JSON.parse(this.props.json));
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
                    <a className="delete_button btn-floating waves-effect waves-light" onClick={this.deleteTopic}>
                        <i className="material-icons">delete</i>
                    </a>
                </div>
                <span>Paradigm:  {topic.getParadigm()}</span><br/><br/>
                
                <label htmlFor="protocol">Protocol</label>
                <select className="browser-default" id="protocol">
                    <option selected={"tcp" === protocol ? "selected" : null} value="tcp">tcp</option>
                    <option selected={"udp" === protocol ? "selected" : null} value="udp">udp</option>
                    <option selected={"ipc" === protocol ? "selected" : null} value="ipc">ipc (not supported yet)</option>
                    <option selected={"inproc" === protocol ? "selected" : null} value="inproc">inproc (not supported yet)</option>
                </select>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" 
                    defaultValue={address} />
                {port ? (
                    <React.Fragment>
                        <label htmlFor="port">Port</label>
                        <input type="text" id="port" 
                            defaultValue={port} />
                    </React.Fragment>
                ) : null}
                {topic.getParadigm() === "pubsub" ? this.pub_section(pub) : this.rep_section(rep)}
                {topic.getParadigm() === "pubsub" ? this.sub_section(sub) : this.req_section(req)}
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