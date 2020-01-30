import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Data from '../../data_classes/Data';
import DeleteHostModal from '../modals/DeleteHostModal';
import AddTopicModal from '../modals/AddTopicModal';

class HomeScreen extends Component {

    setId = (e) => {
        let id = e.target.innerHTML;
        this.props.setId(id);
    }

    unlinkTopic = (e) => {
        let str = e.target.id;
        let [role, id] = str.split("-");
        let dict = JSON.parse(this.props.json);
        dict = this.unlinkTopicHelper(dict, role, id);
        this.props.setJson(JSON.stringify(dict));
    }

    unlinkTopicHelper = (dict, role, id) => {
        let host = this.props.name;
        let topic = dict.topics.find(t => (t.id === id));
        if (role === "publisher") {
            topic.pub = "";
        } else if (role === "subscriber") {
            topic.sub.splice(topic.sub.indexOf(host), 1);
        } else if (role === "requester") {
            topic.req = "";
        } else if (role === "responder") {
            topic.rep = "";
        }
        return dict;
    }

    addTopic = (topic, role) => {
        let host = this.props.name;
        let newDict = JSON.parse(this.props.json);
        let target = newDict.topics.find(t => t.id === topic);
        let r = [];
        switch(role) {
            case "publisher":
                r = "pub"; break;
            case "subscriber":
                r = "sub";
                target[r].push(host);
                break;
            case "responder":
                r = "rep"; break;
            case "requester":
                r = "req"; break;
            default: break;
        }
        if (role !== "subscriber") target[r] = host;
        this.props.setJson(JSON.stringify(newDict));
    }

    deleteHost = () => {
        let data = new Data(JSON.parse(this.props.json));
        let host = data.getHosts().find((h) => h.getName() === this.props.name);
        let dict = JSON.parse(this.props.json);
        host.getPubTopics().map(topic => {
            dict = this.unlinkTopicHelper(dict, "publisher", topic);
        });
        host.getSubTopics().map(topic => {
            dict = this.unlinkTopicHelper(dict, "subscriber", topic);
        });
        host.getReqTopics().map(topic => {
            dict = this.unlinkTopicHelper(dict, "requester", topic);
        });
        host.getRepTopics().map(topic => {
            dict = this.unlinkTopicHelper(dict, "responder", topic);
        });
        dict.hosts = dict.hosts.filter(h => h !== this.props.name);
        this.props.setJson(JSON.stringify(dict));
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
                    <a className="btn-floating waves-effect waves-light btn-small orange" onClick={this.unlinkTopic}>
                        <i id={role+"-"+topic} className="material-icons">close</i>
                    </a>
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
        let topics = data.getTopics().map(topic => topic.getId());
        let topics_dict = JSON.parse(this.props.json).topics;
        return (
            <div className="container">
                <div className="hostscreen_title">
                    <h3 className="leftfloat">{this.props.name}</h3>
                    <DeleteHostModal deleteHost={this.deleteHost.bind(this)} />
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
                <AddTopicModal addTopic={this.addTopic.bind(this)} topics={topics} topics_dict={topics_dict}/>
            </div>
        );
    }

}

export default HomeScreen;