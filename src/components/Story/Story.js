import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getStoryById, deleteStory } from "../../ducks/reducers/storyReducer";
import Event from "./Event";
import NewEventModal from "./NewEventModal";
import EditStoryModal from "./EditStoryModal";
import EditEventModal from "./EditEventModal"

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-pro-solid/faTrash";

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMode: "hidden",
      editModalMode: "hidden",
      editEventModalMode: "hidden"
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleEditEventModal = this.toggleEditEventModal.bind(this);
    this.deleteStoryHandler = this.deleteStoryHandler.bind(this);
  }

  componentDidMount() {
    this.props.getStoryById(this.props.match.params.story_id);
  }

  toggleModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({ modalMode: "visible", editModalMode: "hidden", editEventModalMode: "hidden" });
    } else {
      this.setState({ modalMode: "hidden" });
    }
  }

  toggleEditModal() {
    if (this.state.editModalMode === "hidden") {
      this.setState({ editModalMode: "visible", modalMode: "hidden", editEventModalMode: "hidden" });
    } else {
      this.setState({ editModalMode: "hidden" });
    }
  }

  toggleEditEventModal() {
    if (this.state.editEventModalMode === "hidden") {
      this.setState({ editEventModalMode: "visible", editModalMode: "hidden", modalMode: "hidden" });
    } else {
      this.setState({ editEventModalMode: "hidden" });
    }
  }

  deleteStoryHandler() {
    this.props.deleteStory(this.props.match.params.story_id)
  }

  render() {
    // console.log(this.props);
    const { story } = this.props;

    if (story.events) {
      var mappedEvents = story.events.map(event => {
        // console.log(event);
        return (
          <Fragment key={event.event_id}>
            <Event
              event_title={event.event_title}
              event_description={event.event_description}
              e_created_on={event.e_created_on}
              event_id={event.event_id}
              toggleEditEventModal={this.toggleEditEventModal}
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

              {/* *TO DO: only render this if story belongs to logged in user */}
              <div className="edit-story-links">
                <span onClick={() => this.toggleEditModal()} className="edit-story-link btn border-btn">Edit Story</span>
              </div>
            </div>
          </div>

          <div className="events-wrap">{mappedEvents}</div>

          {/* *TO DO: only display this if story belongs to authorized user */}
          <div className="delete-story-wrap">
            <h3 className="delete-title">Delete Story</h3>
            <button className="btn negative-btn" onClick={() => this.deleteStoryHandler()}> 
              <FontAwesomeIcon icon={faTrash} />
              {` Delete "${story.story_title}"`}
            </button>
          </div>

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

          <EditEventModal
            editEventModalMode={this.state.editEventModalMode}
            toggleEditEventModal={this.toggleEditEventModal}
          />

          <EditStoryModal
            editModalMode={this.state.editModalMode}
            toggleEditModal={this.toggleEditModal}
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
  { getStoryById, deleteStory }
)(Story);
