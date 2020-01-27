import React from 'react';
import { Link } from 'react-router-dom';
import TopicCard from './TopicCard';

class TopicsList extends React.Component {
    delete = () => {
        this.props.delete(this.props.i);
    }

    render() {
        if (this.props.topics === null) return null;
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Paradigm</th>
                        <th>Pub/Rep</th>
                        <th>Sub/Req</th>
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
        );
    }
}

export default TopicsList;