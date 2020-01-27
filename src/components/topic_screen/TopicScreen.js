import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../../data_classes/Data';

class TopicScreen extends Component {

    setName = (e) => {
        let name = e.target.innerHTML;
        this.props.setName(name);
    }
    
    render() {
        let pub = null;
        let sub = [];
        if (this.props.json) {
            let data = new Data(JSON.parse(this.props.json));
            let topic = data.getTopics().find((t) => t.getId() === this.props.id);
            let hosts = topic.getHosts();
            pub = hosts.pub;
            sub = hosts.sub;
        }
        return (
            <div className="container">
                <h4>{this.props.id}</h4>
                <h5>Publisher:</h5>
                <Link to={'/host/'+pub} onClick={this.setName}>
                    {pub}
                </Link>
                <h5>Subscribers:</h5>
                {sub.map((host, i) => (
                    <React.Fragment>
                        <Link to={'/host/'+host} onClick={this.setName} key={i}>
                            {host}
                        </Link>
                        <br />
                    </React.Fragment>
                ))}
            </div>
        );
    }

}

export default TopicScreen;