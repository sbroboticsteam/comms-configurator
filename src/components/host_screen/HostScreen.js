import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';

class HomeScreen extends Component {

    setId = (e) => {
        let id = e.target.innerHTML;
        this.props.setId(id);
    }

    deleteTopic = (e) => {
        console.log("Deleting topic")
    }

    unlinkTopic = (e) => {
        console.log("Unlinking topic")
    }

    addTopic = () => {
        console.log("Adding topic")
    }

    deleteHost = () => {
        console.log("Deleting this host")
    }

    generate_entry = (topic, role, i) => {
        return (
            <tr key={i}>
                <td>
                <Link to={'/topic/'+topic} onClick={this.setId} key={i}>
                    {topic}
                </Link>
                </td>
                <td>{role}</td>
                <td>
                    {role === ("publisher" || "responder") ? (
                        <a id={"delete_"+topic} className="btn-floating waves-effect waves-light btn-small red" onClick={this.deleteTopic}>
                            <i className="material-icons">delete</i>
                        </a>
                    ) : (
                        <a id={"unlink_"+topic} className="btn-floating waves-effect waves-light btn-small orange" onClick={this.unlinkTopic}>
                            <i className="material-icons">close</i>
                        </a>
                    )}
                </td>
            </tr>
        );
    }
    
    render() {
        if (!this.props.json) return null;
        let data = new Data(JSON.parse(this.props.json));
        let host = data.getHosts().find((h) => h.getName() === this.props.name);
        if (!host) return <Redirect to="/" />
        let pub = host.getPubTopics();
        let sub = host.getSubTopics();
        let req = host.getReqTopics();
        let rep = host.getRepTopics();
        return (
            <div className="container">
                <div className="hostscreen_title">
                    <h3 className="leftfloat">{this.props.name}</h3>
                    <a className="delete_button btn-floating waves-effect waves-light" onClick={this.deleteHost}>
                        <i className="material-icons">delete</i>
                    </a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pub.map((topic, i) => (
                            this.generate_entry(topic, "publisher", i)
                        ))}
                        {sub.map((topic, i) => (
                            this.generate_entry(topic, "subscriber", i)
                        ))}
                        {req.map((topic, i) => (
                            this.generate_entry(topic, "requester", i)
                        ))}
                        {rep.map((topic, i) => (
                            this.generate_entry(topic, "responder", i)
                        ))}
                    </tbody>
                </table>
                <br />
                <a className="btn-floating waves-effect waves-light" onClick={this.addTopic}>
                    <i className="material-icons">add</i>
                </a>
            </div>
        );
    }

}

export default HomeScreen;