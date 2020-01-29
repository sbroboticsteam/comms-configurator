import React from 'react';
import Modal from './Modal';

class NewHostModal extends Modal {
    addHost = () => {
        let name = document.getElementById("input-hostname").value;
        if (name && name !== "") {
            this.props.addHost(name);
        }
        this.clearName();
    }

    clearName = () => {
        document.getElementById("input-hostname").value = "";
    }

    render() {
        return (
            <React.Fragment>
                <a className="btn-floating waves-effect waves-light modal-trigger" data-target="newhost">
                    <i className="material-icons">add</i>
                </a>
                <div id="newhost" className="modal" ref={Modal => this.Modal = Modal}>
                    <div className="modal-content">
                        <h5>New Host</h5>
                        <p>Enter name of new host:</p>
                        <input type="text" id="input-hostname" />
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat" onClick={this.addHost}>Add</a>
                        <a href="#!" className="modal-close btn-flat" onClick={this.clearName}>Cancel</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NewHostModal;