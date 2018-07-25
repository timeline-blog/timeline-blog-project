import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment'
import axios from 'axios'
import EditEventModal from './EditEventModal'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-pro-solid/faTrash";
import faPen from "@fortawesome/fontawesome-pro-solid/faPen";

import { getStoryById, addComment, deleteComment } from "../../ducks/reducers/storyReducer";
import Comment from './Comment';


class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventState: 'collapsed',
            eventTitleField: 'Event Title Here',
            eventContentField: 'Event Content here',
            eventImages: [],
            comments: [],
            commentInput: ''
        };
        
    }

    collapseExpand=()=> {
        if ( this.state.eventState === 'collapsed' ) {
            this.setState({ eventState: 'expanded' });
            axios.get(`/api/comments/${this.props.event_id}`)
                .then(response => {
                    console.log('response: ', response);
                    this.setState({
                        comments: response.data
                    })
                })
        } else {
            this.setState({ eventState: 'collapsed' });
        }
    }

    deleteEvent = (event_id) => {
        axios.delete(`/api/event/${event_id}`)
             .then(()=>{
                this.props.getStoryById(this.props.story_id)
             })
    }

    inputHandler = (e) => {
        this.setState({
            commentInput: e.target.value
        })
    }

    addCommentHandler = () => {
        const {user_id} = this.props.user;
        const {event_id} = this.props;
        let c_created_on = moment().format('MM/DD/YY, hh:mm');
        this.props.addComment(user_id, this.state.commentInput, c_created_on, event_id)
            .then(() => axios.get(`/api/comments/${this.props.event_id}`)
            .then(response => {
                console.log('response: ', response);
                this.setState({
                    comments: response.data,
                    commentInput: ''
                })
            }))
    }

    deleteCommentHandler = (comment_id) => {
        this.props.deleteComment(comment_id)
            .then(() => axios.get(`/api/comments/${this.props.event_id}`)
            .then(response => {
                console.log('response: ', response);
                this.setState({
                    comments: response.data
                })
            }))
    }

    render() {
        const { user } = this.props;
        const {story_userid} = this.props;
        // console.log('this.props: ', this.props);
        // console.log('this.state: ', this.state);
        const mappedComments = this.state.comments.map((comment) => {
            return (
                <Comment 
                    key={comment.comment_id}
                    avatar={comment.avatar}
                    display_name={comment.display_name}
                    comment={comment.comment}
                    c_created_on={comment.c_created_on}
                    comment_id={comment.comment_id}
                    event_id={comment.event_id}
                    deleteCommentHandler={this.deleteCommentHandler}
                    user_id={comment.user_id}
                    user={this.props.user}
                />
            )
        })
       
        return (
            <div className={`event-wrap ${this.state.eventState}`}>
                <span className="connector top-connector"></span>

                {/* *TO DO: only render if story belongs to logged in user <<DONE>> */}
               {user.user_id && (story_userid===user.user_id)&&(<div className="edit-event-links">
                    <button 
                        onClick={() => this.props.toggleEditEventModal(this.props.event_id)} 
                        className="edit-btn edit-event-btn">
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button 
                        onClick={()=>this.deleteEvent(this.props.event_id)} 
                        className="edit-btn delete-btn">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
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
                            {mappedComments}
                        </div>
                        {(this.props.user.user_id) ?
                        <div className="comment-form-wrap">
                            <textarea onChange={(e) => this.inputHandler(e)} name="" id="" className="comment-form" value={this.state.commentInput} placeholder="Leave a comment..."></textarea>
                            <button className="btn" onClick={() => this.addCommentHandler()}>Post Comment</button>
                        </div>
                        : null}

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
                    updateDisabled={this.props.updateDisabled}
                    editEventuploadButtonStatus={this.props.editEventuploadButtonStatus}
                    updateButton={this.props.updateButton}
                    titleCharsRemaining={this.props.titleCharsRemaining}
                    updateMonitorEventImages={this.props.updateMonitorEventImages}
                    monitorEventImages={this.props.monitorEventImages}
                    eventID={this.props.eventID}
                    updateImgUrl= {this.props.updateImgUrl}
                    imgUrl={this.props.imgUrl}
                    />
            </div>
        );
    }
}

const mapStateToProps =(state)=>{
    return{
        user: state.user.authedUser
    }
}

export default connect(mapStateToProps,{getStoryById, addComment, deleteComment})(Event);