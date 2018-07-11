import React, { Component } from 'react'

class Event extends Component {
    render() {
        return (
            <div className="event-wrap">
                <span className="connector top-connector"></span>

                Content goes here

                <span className="connector bottom-connector"></span>
            </div>
        );
    }
}

export default Event;