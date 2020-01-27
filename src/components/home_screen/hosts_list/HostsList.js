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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Topics</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.hosts.map((host, i) => (
                        <HostCard name={host.getName()} key={i} setName={this.props.setName} host={host} />
                    ))}
                </tbody>
            </table>
        );
    }
}

export default HostsList;