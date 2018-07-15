import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getStoryById } from "../../ducks/reducers/storyReducer";
import Event from "./Event";
import NewEventModal from "./NewEventModal";

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMode: "hidden"
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.getStoryById(this.props.match.params.story_id);
  }

  toggleModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({ modalMode: "visible" });
    } else {
      this.setState({ modalMode: "hidden" });
    }
  }

  render() {
    console.log(this.props);
    const { story } = this.props;

    if (story.events) {
      var mappedEvents = story.events.map(event => {
        // console.log(event);
        return (
          <Fragment>
            <Event
              key={event.event_id}
              event_title={event.event_title}
              event_description={event.event_description}
              e_created_on={event.e_created_on}
              event_id={event.event_id}
            />
            <span className="connect-line"></span>
          </Fragment>
        );
      });
    }

    return (
      <div className="outer-wrap story-wrap">
        <div className="inner-wrap">
          <div className="page-header story-header">
            <h1 className="page-title story-title">
              {story.story_title}{" "}
              <span className="byline">by {story.display_name}</span>
            </h1>
            <p className="page-description story-description">
              {story.story_description}
            </p>
            <div className="follow-info-wrap">
              <button className="follow-btn btn">Like</button>
              <span className="follow-count">{story.like_count}</span>
            </div>
          </div>

          <div className="events-wrap">{mappedEvents}</div>

          {/* *TO DO: only display this if story belongs to authorized user */}
          <div className="add-event-wrap">
            <button
              onClick={() => this.toggleModal()}
              className="add-event-btn btn"
            >
              <strong>+</strong> New Event
            </button>
          </div>

          <NewEventModal
            modalMode={this.state.modalMode}
            toggleModal={this.toggleModal}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { story: state.story.selectedStory };
};

export default connect(
  mapStateToProps,
  { getStoryById }
)(Story);
