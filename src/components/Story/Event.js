import React, { Component } from 'react';
import { connect } from "react-redux";
import Comment from './Comment';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventState: 'collapsed'
        };
        this.collapseExpand = this.collapseExpand.bind( this );
    }

    collapseExpand() {
        if ( this.state.eventState === 'collapsed' ) {
            this.setState({ eventState: 'expanded' });
        } else {
            this.setState({ eventState: 'collapsed' });
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div className={`event-wrap ${this.state.eventState}`}>
                <span className="connector top-connector"></span>

                {/* *TO DO: only render if story belongs to logged in user */}
               { <div className="edit-event-links">
                    <button onClick={() => this.props.toggleEditEventModal()} className="btn">Edit Event</button>
                    <button className="btn negative-border-btn">Delete Event</button>
                </div>}

                <header className="event-header">
                    <h2 className="event-title">{this.props.event_title}</h2>
                    <p className="event-date">{this.props.e_created_on}</p>
                </header>

                <div className="event-gallery">
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
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
            </div>
        );
    }
}

const mapStateToProps =(state)=>{
    return{
        user: state.user.authedUser
    }
}

export default connect(mapStateToProps,null)(Event);