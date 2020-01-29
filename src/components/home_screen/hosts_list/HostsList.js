import React from 'react';
import { Link } from 'react-router-dom';
import HostCard from './HostCard';
import { realpathSync } from 'fs';

class HostsList extends React.Component {
    delete = () => {
        this.props.delete(this.props.i);
    }

    addHost = () => {
        console.log("Adding host");
    }

    render() {
        if (this.props.hosts === null) return null;
        return (
            <div id="hostlist">
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
                <br />
                <a className="btn-floating waves-effect waves-light" onClick={this.addHost}>
                    <i className="material-icons">add</i>
                </a>
            </div>
        );
    }
}

export default HostsList;