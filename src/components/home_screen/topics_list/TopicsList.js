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
            <div className="row">
                {this.props.topics.map((topic, i) => (
                    <TopicCard 
                        id={topic.getId()} 
                        key={i}
                        paradigm={topic.getParadigm()}
                        left={topic.getHosts().pub ? topic.getHosts().pub : topic.getHosts().req}
                        right={topic.getHosts().sub ? topic.getHosts().sub : topic.getHosts().rep}
                        setId={this.props.setId} />
                ))}
            </div>
        );
    }
}

export default TopicsList;