import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../../data_classes/Data';

class HomeScreen extends Component {

    setId = (e) => {
        let id = e.target.innerHTML;
        this.props.setId(id);
    }
    
    render() {
        let pub = [];
        let sub = [];
        if (this.props.json) {
            let data = new Data(JSON.parse(this.props.json));
            let host = data.getHosts().find((h) => h.getName() === this.props.name);
            pub = host.getPubTopics();
            sub = host.getSubTopics();
        }
        return (
            <div className="container">
                <h4>{this.props.name}</h4>
                <h5>Pub topics:</h5>
                {pub.map((id, i) => (
                    <Link to={'/topic/'+id} onClick={this.setId} key={i}>
                        {id}
                    </Link>
                ))}
                <h5>Sub topics:</h5>
                {sub.map((id, i) => (
                    <Link to={'/topic/'+id} onClick={this.setId} key={i}>
                        {id}
                    </Link>
                ))}
            </div>
        );
    }

}

export default HomeScreen;