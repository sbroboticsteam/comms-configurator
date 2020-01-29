import React from 'react';
import Modal from './Modal';

class ClearConfigsModal extends Modal {
    
    render() {
        return (
            <React.Fragment>
                <a className="waves-effect waves-light btn-small toolbar-buttons modal-trigger" 
                    onClick={this.clear} data-target="clear-modal">Clear</a>
                <div id="clear-modal" className="modal" ref={Modal => this.Modal = Modal}>
                    <div className="modal-content">
                        <h5>Clear configs?</h5>
                        <p>You will lose all current data.</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat" onClick={this.props.clear}>Yes</a>
                        <a href="#!" className="modal-close btn-flat">No</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ClearConfigsModal;