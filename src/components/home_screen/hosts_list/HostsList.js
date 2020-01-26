import React from 'react';
import { Link } from 'react-router-dom';
import HostCard from './HostCard';

class HostsList extends React.Component {
    delete = () => {
        this.props.delete(this.props.i);
    }

    render() {
        if (this.props.hosts === null) return null;
        return (
            <div className="row">
                {this.props.hosts.map((host, i) => (
                    <HostCard name={host.getName()} key={i} setName={this.props.setName} />
                ))}
            </div>
        );
    }
}

export default HostsList;