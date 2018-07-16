import React, { Component } from 'react';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";

export default class NewEventModal extends Component {
    // constructor()
    render() {
        return (
            <div className={`outer-modal ${this.props.modalMode}`}>
            <div className="inner-modal">

                <button onClick={() => this.props.toggleModal()} className="close-modal border-btn btn">
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <header className="modal-header">
                    <h3 className="modal-title">New Event</h3>
                </header>
                <div className="modal-body">
                    <div className="field-group">
                        <label htmlFor="">Event Title</label>
                        <input type="text" className="main-input"/>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Content</label>
                        <textarea type="text" rows="8" className="main-input"/>
                    </div>

                    <div className="field-group">
                        <label className="btn border-btn images-label" htmlFor="">Add Images</label>
                        {/* <button className="btn border-btn">Upload Images</button> */}
                    </div>

                </div>
                <button className="btn create-event-btn">Create Event</button>

            </div>
            </div>
        );
    }
}

