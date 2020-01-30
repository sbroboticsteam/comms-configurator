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
    
    render() {
        if(this.props.json) {
            let data = new Data(JSON.parse(this.props.json));
            let topic = data.getTopics().find((t) => t.getId() === this.props.id);
            if (!topic) return <Redirect to="/" />
            if (topic.getParadigm() == "pubsub") {
                return this.pubsub();
            }
            else if (topic.getParadigm() == "reqrep") {
                return this.reqrep();
            }
        }
        return null;
    }

}

export default TopicScreen;