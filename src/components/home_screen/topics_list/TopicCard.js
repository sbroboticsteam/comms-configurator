import React from 'react';
import { Link } from 'react-router-dom';

class TopicCard extends React.Component {

    setId = () => this.props.setId(this.props.id);

    render() {
        let hosts = this.props.topic.getHosts();
        let pubrep = hosts.pub ? hosts.pub : hosts.rep;
        let subreq = hosts.sub ? null : hosts.req;
        if (subreq === null) {
            subreq = "";
            hosts.sub.map((topic) => {
                subreq = subreq + topic + ", ";
            })
        }
        let {protocol, address, port} = this.props.topic.getProtocolInfo();
        return (
            <tr>
                <td>
                    <Link to={"/topic/"+this.props.id} onClick={this.setId}>
                        {this.props.id}
                    </Link>
                </td>
                <td>{this.props.topic.getParadigm()}</td>
                <td>{pubrep}</td>
                <td>{subreq}</td>
                <td>{protocol}</td>
                <td>{address}</td>
                <td>{port}</td>
            </tr>
        );
    }
}

export default TopicCard;