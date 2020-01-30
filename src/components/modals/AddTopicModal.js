import React from 'react';
import Modal from './Modal';

const defaultState = {
    topic: "",
    availableRoles: [],
    role: null
}

class AddTopicModal extends Modal {
    state = defaultState;

    handleTopicSelect = (e) => {
        let value = e.target.options[e.target.selectedIndex].value;
        let topic = this.props.topics_dict.find(t => t.id === value);
        let roles = [];
        if (topic.paradigm === "pubsub") {
            if (topic.pub === "") roles.push("publisher");
            roles.push("subscriber");
        }
        else if (topic.paradigm === "reqrep") {
            if (topic.rep === "") roles.push("responder");
            if (topic.req === "") roles.push("requester");
        }
        let newState = {topic: value, availableRoles: roles, role: roles[0]};
        this.setState(newState);
    }

    handleRoleSelect = (e) => {
        let value = e.target.options[e.target.selectedIndex].value;
        this.setState({role: value});
    }

    addTopic = () => {
        this.props.addTopic(this.state.topic, this.state.role);
        this.clearFields();
    }

    clearFields = () => {
        this.setState(defaultState);
    }

    render() {
        var topics = this.props.topics;
        return (
            <React.Fragment>
                <a className="btn-floating waves-effect waves-light modal-trigger" 
                    data-target="add-topic-modal">
                    <i className="material-icons">add</i>
                </a>
                <div id="add-topic-modal" className="modal" ref={Modal => this.Modal = Modal}>
                    <div className="modal-content">
                        <h5>Add a topic to this host:</h5>
                    </div>
                    <label htmlFor="input-topic">Topic:</label>
                    <select value={this.state.topic} className="browser-default" 
                        onChange={this.handleTopicSelect} id="input-topic">
                        <option value="" disabled hidden>Select...</option>
                        {topics.map((topic, i) => (
                            <option value={topic} key={i}>{topic}</option>
                        ))}
                    </select>
                    {this.state.topic !== "" ? (
                        <React.Fragment>
                            <label htmlFor="input-role">Available roles:</label>
                            <select value={this.state.role} className="browser-default" 
                                onChange={this.handleRoleSelect} id="input-role">
                                {this.state.availableRoles.map((role, i) => (
                                    <option value={role} key={i}>{role}</option>
                                ))}
                            </select>
                        </React.Fragment>
                    ) : null}
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat" onClick={this.addTopic}>Add</a>
                        <a href="#!" className="modal-close btn-flat" onClick={this.clearFields}>Cancel</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddTopicModal;