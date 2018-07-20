import React, { Component } from 'react';
import { connect } from 'react-redux'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";


class EditEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventTitleField: 'Event Title Here',
            eventContentField: 'Event Content here',
            eventImages: [],
            event_id: this.props.eventID
        };
    }



    changeTitleField( value ) {
        this.setState({ eventTitleField: value });
    }

    changeContentField( value ) {
        this.setState({ eventContentField: value });
    }

    render() {
          
            this.props.selectedEvent[0] && this.props.selectedEvent[0].title;
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
                            value={this.props.selectedEvent[0]&&this.props.selectedEvent[0].event_title}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Content</label>
                        <textarea 
                            type="text" 
                            rows="8" 
                            className="main-input"
                            onChange={(e) => this.changeContentField(e.target.value)}
                            value={this.props.selectedEvent[0]&&this.props.selectedEvent[0].event_description}
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

const mapStateToProps=state=>{
    return{
        story: state.story.selectedStory
    }
}

export default connect(mapStateToProps,null)(EditEventModal)