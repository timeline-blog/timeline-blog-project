import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment'
import axios from 'axios'
import EditEventModal from './EditEventModal'



import { getStoryById } from "../../ducks/reducers/storyReducer";
import Comment from './Comment';


class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventState: 'collapsed',
            eventTitleField: 'Event Title Here',
            eventContentField: 'Event Content here',
            eventImages: []
        };
        
    }

    collapseExpand=()=> {
        if ( this.state.eventState === 'collapsed' ) {
            this.setState({ eventState: 'expanded' });
        } else {
            this.setState({ eventState: 'collapsed' });
        }
    }

    deleteEvent=(event_id)=>{
        axios.delete(`/api/event/${event_id}`)
             .then(response=>{
                this.props.getStoryById(this.props.story_id)
             })
    }

    render() {
        const { user } = this.props;
        const {story_userid} = this.props;
       
        return (
            <div className={`event-wrap ${this.state.eventState}`}>
                <span className="connector top-connector"></span>

                {/* *TO DO: only render if story belongs to logged in user <<DONE>> */}
               {user.user_id && (story_userid===user.user_id)&&(<div className="edit-event-links">
                    <button onClick={() => this.props.toggleEditEventModal(this.props.event_id)} className="btn">Edit Event</button>
                    <button onClick={()=>this.deleteEvent(this.props.event_id)} className="btn negative-border-btn">Delete Event</button>
                </div>)}

                <header className="event-header">
                    <h2 className="event-title">{this.props.event_title}</h2>
                    <p className="event-date">{moment(this.props.e_created_on).from(moment().format("MM/DD/YY, hh:mm"))}</p>
                </header>

                <div className="event-gallery">
                {this.props.images&&this.props.images.map((element,index)=>{
                    return (<div key={index} className="event-image" style={{ backgroundImage:`url(${element})`}}></div>)
                })}
                   
                </div>

                <div className="event-content">
                    <p>{this.props.event_description}</p>

                    <div className="event-comments-section">
                        <div className="event-comments-header">12 comments</div>

                        <div className="comments-list">
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>

                        <div className="comment-form-wrap">
                            <textarea name="" id="" className="comment-form" placeholder="Leave a comment..."></textarea>
                            <button className="btn">Post Comment</button>
                        </div>

                    </div>
                </div>

                <div className="content-fade">
                    <button 
                    onClick={() => this.collapseExpand()}
                    className="expand-event">
                    {this.state.eventState === 'collapsed' ? 'Expand +' : 'Collapse -'}
                </button>
                </div>
                <span className="connector bottom-connector"></span>
               
                <EditEventModal
                    editEventModalMode={this.props.editEventModalMode}
                    toggleEditEventModal={this.props.toggleEditEventModal}
                    event_title={this.props.title}
                    event_description={this.props.eventDescription}
                    eventTitleChange={this.props.eventTitleChange}
                    eventDescriptionChange={this.props.eventDescriptionChange}
                    eventImages={this.props.eventImages}
                    _handleImageChange={this.props._handleImageChange}
                    removeImages={this.props.removeImages}
                    resizedImages={this.props.resizedImages}
                    uploadButtonStatus={this.state.uploadButtonStatus}
                    updateEventImages={this.props.updateEventImages}
                    removeImagesEvents={this.props.removeImagesEvents}
                />
            </div>
        );
    }
}

const mapStateToProps =(state)=>{
    return{
        user: state.user.authedUser,

    }
}

export default connect(mapStateToProps,{getStoryById})(Event);