import React, { Component } from 'react';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";

export default class EditEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventTitleField: 'Event Title Here',
            eventContentField: 'Event Content here',
            eventImages: []
        };
    }

    changeTitleField( value ) {
        this.setState({ eventTitleField: value });
    }

    changeContentField( value ) {
        this.setState({ eventContentField: value });
    }

    render() {
        return (
            <div className={`outer-modal ${this.props.editEventModalMode}`}>
            <div className="inner-modal">

                <button onClick={() => this.props.toggleEditEventModal()} className="close-modal border-btn btn">
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <header className="modal-header">
                    <h3 className="modal-title">Edit Event</h3>
                </header>
                <div className="modal-body">
                    <div className="field-group">
                        <label htmlFor="">Event Title</label>
                        <input 
                            type="text" 
                            className="main-input"
                            onChange={(e) => this.changeTitleField(e.target.value)}
                            value={this.state.eventTitleField}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Content</label>
                        <textarea 
                            type="text" 
                            rows="8" 
                            className="main-input"
                            onChange={(e) => this.changeContentField(e.target.value)}
                            value={this.state.eventContentField}
                        />
                    </div>

                    <div className="field-group">
                        <label className="btn border-btn images-label" htmlFor="">Add Images</label>
                        {/* <button className="btn border-btn">Add Image</button> */}
                    </div>

                </div>
                <button className="btn create-event-btn">Save Changes</button>

            </div>
            </div>
        );
    }
}

