import React from 'react';
import { Link } from 'react-router-dom';

class HostCard extends React.Component {

    setName = () => this.props.setName(this.props.name);

    render() {
        return (
            <div className="host-card">
                <Link to={'/host/' + this.props.name} key={this.props.i} onClick={this.setName}>
                    <span className="">{this.props.name}</span>
                </Link>
            </div>
        );
    }
}

export default HostCard;