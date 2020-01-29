import React from 'react';
import { Link } from 'react-router-dom';
import TopicCard from './TopicCard';

class TopicsList extends React.Component {
    delete = () => {
        this.props.delete(this.props.i);
    }

    addTopic = () => {
        console.log("Adding topic");
    }

    render() {
        if (this.props.topics === null) return null;
        return (
            <div id="topiclist">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Paradigm</th>
                            <th>Pub/Rep</th>
                            <th>Sub/Req</th>
                            <th>Protocol</th>
                            <th>Address</th>
                            <th>Port</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.topics.map((topic, i) => (
                            <TopicCard 
                                id={topic.getId()} 
                                key={i}
                                topic={topic}
                                setId={this.props.setId} />
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

export default TopicsList;