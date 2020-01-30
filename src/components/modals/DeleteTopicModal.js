import React from 'react';
import Modal from './Modal';

class DeleteTopicModal extends Modal {
    
    render() {
        return (
            <React.Fragment>
                <a className="delete_button btn-floating waves-effect waves-light modal-trigger"
                    data-target="delete-modal">
                    <i className="material-icons">delete</i>
                </a>
                <div id="delete-modal" className="modal" ref={Modal => this.Modal = Modal}>
                    <div className="modal-content">
                        <h5>Delete Topic?</h5>
                        <p>You will not be able to undo this action.</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat" onClick={this.props.deleteTopic}>Yes</a>
                        <a href="#!" className="modal-close btn-flat">No</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DeleteTopicModal;