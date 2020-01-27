import React from 'react';
import { Link } from 'react-router-dom';

class HostCard extends React.Component {

    setName = () => this.props.setName(this.props.name);

    render() {
        let topics = "";
        this.props.host.getPubTopics().map((topic) => (
            topics = topics + topic + ", "
        ))
        this.props.host.getSubTopics().map((topic) => (
            topics = topics + topic + ", "
        ))
        return (
            <tr>
                <td>
                    <Link to={'/host/' + this.props.name} onClick={this.setName}>
                        {this.props.name}
                    </Link>
                </td>
                <td>{topics}</td>
            </tr>
        );
    }
}

export default HostCard;