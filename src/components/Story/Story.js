import React, { Component } from "react";
import { getStoryById } from "../../ducks/reducers/storyReducer";
import { connect } from "react-redux";

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

  toggleModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({ modalMode: "visible" });
    } else {
      this.setState({ modalMode: "hidden" });
    }
  }

  render() {
    return (
      <div className="outer-wrap story-wrap">
        <div className="inner-wrap">
          <div className="page-header story-header">
            <h1 className="page-title story-title">
              Story Title <span className="byline">by John Doe</span>
            </h1>
            <p className="page-description story-description">
              Pellentesque libero mi, sodales ut purus eget, dapibus luctus leo.
              Nam odio dui, vulputate et lobortis eu, hendrerit ut ipsum.
              Integer rhoncus, urna sit amet hendrerit varius, nisl mi
              condimentum nisi, nec mattis ligula velit vitae sapien.
            </p>
            <div className="follow-info-wrap">
              <button className="follow-btn btn">Like</button>
              <span className="follow-count">107</span>
            </div>
          </div>

          <div className="events-wrap">
            <Event />
            <span className="connect-line" />
            <Event />
            <span className="connect-line" />
            <Event />
          </div>

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
  return {};
};

export default connect(
  mapStateToProps,
  { getStoryById }
)(Story);
