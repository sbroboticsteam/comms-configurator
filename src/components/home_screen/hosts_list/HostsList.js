import React from 'react';
import HostCard from './HostCard';
import NewHostModal from '../../modals/NewHostModal';

class HostsList extends React.Component {
    delete = () => {
        this.props.delete(this.props.i);
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
                <NewHostModal addHost={this.props.addHost} />
            </div>
        );
    }
}

export default HostsList;