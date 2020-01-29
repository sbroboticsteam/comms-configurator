import React, { Component } from 'react';
import MaterializeCSS from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "10%",
            endingTop: "30%"
        };
        MaterializeCSS.Modal.init(this.Modal, options);
    }
    
    render() {
        return null;
    }
}

export default Modal;