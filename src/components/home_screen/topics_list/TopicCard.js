import React from 'react';
import { Link } from 'react-router-dom';

class TopicCard extends React.Component {

    setId = () => this.props.setId(this.props.id);

    render() {
        return (
            <div className="topic-card">
                <Link to={'/topic/' + this.props.id} key={this.props.i} onClick={this.setId}>
                    <div className="row">
                        <div className="col m1" />
                        <div className="col m2">
                            <span className="">{this.props.id}:</span>
                        </div>
                        <div className="col m2">
                            <span className="">{this.props.left}</span>
                        </div>
                        <div className="col m2">
                            <span className="">{this.props.paradigm}</span>
                        </div>
                        <div className="col m4">
                            <span className="">{this.props.right}</span>
                        </div>
                        <div className="col m1" />
                    </div>
                </Link>
            </div>
        );
    }
}

export default TopicCard;