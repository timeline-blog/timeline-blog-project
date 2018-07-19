import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ImageCompressor from "image-compressor.js";

import {
  getStoryById,
  deleteStory,
  likeCount,
  addLike,
  unlike
} from "../../ducks/reducers/storyReducer";

import Event from "./Event";
import NewEventModal from "./NewEventModal";
import EditStoryModal from "./EditStoryModal";
import EditEventModal from "./EditEventModal";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-pro-solid/faTrash";

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMode: "hidden",
      editModalMode: "hidden",
      editEventModalMode: "hidden",
      eventTitle: "",
      eventDescription: "",
      images: [],
      resizedImages: []
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleEditEventModal = this.toggleEditEventModal.bind(this);
    this.deleteStoryHandler = this.deleteStoryHandler.bind(this);
  }

  eventTitleChange = value => {
    this.setState({ eventTitle: value });
  };

  eventDescriptionChange = value => {
    this.setState({ eventDescription: value });
  };

  _handleImageChange = e => {
    if (this.state.images.length == 4) {
      return;
    }
    let arr = [];
    let id = 7; //the id should come from the story or event
    let reader = new FileReader();
    let img = e.target.files[0];
    //    console.log('normal img ', img)
    //       let resized = [];
    //       resized = this.state.resizedImages.slice();
    //       resized.push(img)
    //      this.setState({resizedImages: resized})

    let that = this;
    new ImageCompressor(img, {
      quality: 0.3, //signifies how much quality you want on the photo
      success(result) {
        let newArr = that.state.resizedImages.slice();
        // console.log('image arr after resize ',result)
        newArr.push(result);
        that.setState({
          resizedImages: newArr
        });
      }
    });
    reader.addEventListener("load", () => {
      arr = this.state.images.slice();
      id++;
      arr.push({
        id: id,
        url: reader.result
      });
      this.setState({
        images: arr
      });
    });
    img && reader.readAsDataURL(img);
  };

  removeImages = index => {
    let arr = this.state.images.slice();
    let arr2 = this.state.resizedImages.slice();
    arr.splice(index, 1);
    arr2.splice(index, 1);
    this.setState({ images: arr });
    this.setState({ resizedImages: arr2 });
  };

  componentDidMount() {
    this.props.getStoryById(this.props.match.params.story_id);
    this.props.likeCount(this.props.match.params.story_id);
  }

  toggleModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({
        modalMode: "visible",
        editModalMode: "hidden",
        editEventModalMode: "hidden"
      });
    } else {
      this.setState({
        modalMode: "hidden",
        eventTitle: "",
        eventDescription: "",
        images: [],
        resizedImages: []
      });
    }
  }

  toggleEditModal() {
    if (this.state.editModalMode === "hidden") {
      this.setState({
        editModalMode: "visible",
        modalMode: "hidden",
        editEventModalMode: "hidden"
      });
    } else {
      this.setState({ editModalMode: "hidden" });
    }
  }

  toggleEditEventModal() {
    if (this.state.editEventModalMode === "hidden") {
      this.setState({
        editEventModalMode: "visible",
        editModalMode: "hidden",
        modalMode: "hidden"
      });
    } else {
      this.setState({ editEventModalMode: "hidden" });
    }
  }

  deleteStoryHandler() {
    this.props.deleteStory(this.props.match.params.story_id);
  }

  addLikeHandler() {
    console.log("handler fired");
    this.props
      .addLike(this.props.user.user_id, this.props.match.params.story_id)
      .then(() => this.props.likeCount(this.props.match.params.story_id));
  }

  unlikeHandler() {
    this.props
      .unlike(this.props.user.user_id, this.props.match.params.story_id)
      .then(() => this.props.likeCount(this.props.match.params.story_id));
  }

  render() {
    console.log(this.props);

    const { story } = this.props;
    const { user } = this.props;

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
            <span className="connect-line" />
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
              {this.props.user.user_id ? (
                <button
                  onClick={() => {
                    console.log("clicked"), this.addLikeHandler();
                  }}
                  className="follow-btn btn"
                >
                  Like
                </button>
              ) : (
                <div>Likes</div>
              )}
              {/* {this.props.user.user_id && } */}
              <span className="follow-count">{this.props.likes}</span>

              {/* *TO DO: only render this if story belongs to logged in user DONE*/}
              {user.user_id &&
                user.user_id === story.user_id && (
                  <div className="edit-story-links">
                    <span
                      onClick={() => this.toggleEditModal()}
                      className="edit-story-link btn border-btn"
                    >
                      Edit Story
                    </span>
                  </div>
                )}
            </div>
          </div>

          <div className="events-wrap">{mappedEvents}</div>

          {/* *TO DO: only display this if story belongs to authorized user DONE */}
          {user.user_id &&
            user.user_id === story.user_id && (
              <div className="delete-story-wrap">
                <h3 className="delete-title">Delete Story</h3>
                <button
                  className="btn negative-btn"
                  onClick={() => this.deleteStoryHandler()}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  {` Delete "${story.story_title}"`}
                </button>
              </div>
            )}

          {user.user_id &&
            user.user_id === story.user_id && (
              <div className="add-event-wrap">
                <button
                  onClick={() => this.toggleModal()}
                  className="add-event-btn btn"
                >
                  <strong>+</strong> New Event
                </button>
              </div>
            )}

          <NewEventModal
            modalMode={this.state.modalMode}
            toggleModal={this.toggleModal}
            _handleImageChange={this._handleImageChange}
            eventTitleChange={this.eventTitleChange}
            eventDescriptionChange={this.eventDescriptionChange}
            removeImages={this.removeImages}
            images={this.state.images}
            resizedImages={this.state.resizedImages}
            title={this.state.eventTitle}
            eventDescription={this.state.eventDescription}
            story_id={this.props.match.params.story_id}
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
  return {
    story: state.story.selectedStory,
    user: state.user.authedUser,
    likes: state.story.likeCount
  };
};

export default connect(
  mapStateToProps,
  { getStoryById, deleteStory, likeCount, addLike, unlike }
)(Story);
