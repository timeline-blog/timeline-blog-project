import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ImageCompressor from "image-compressor.js";

import {
  getStoryById,
  deleteStory,
  likeCount,
  addLike,
  unlike,
  likeCheck
} from "../../ducks/reducers/storyReducer";

import Event from "./Event";
import NewEventModal from "./NewEventModal";
import EditStoryModal from "./EditStoryModal";


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
      resizedImages: [],
      uploadButtonStatus: "active",
      editEventuploadButtonStatus: 'active',
      selectedEvent: [],
      titleCharsRemaining: 40,
      monitorEventImages: [],
      eventID: 0,
      imgUrl: [],
     
      storyTitle: '',
      storyDescription: '',
      storyCategory: ''
    };
    this.titleMaxChars = 40;
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleEditEventModal = this.toggleEditEventModal.bind(this);
    this.deleteStoryHandler = this.deleteStoryHandler.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  updateImgUrl=(value)=>{
     let arr = this.state.imgUrl.slice()
     arr.push(value)
     this.setState({imgUrl: arr})
  }

  eventTitleChange = value => {
    if((this.titleMaxChars - value.length)>=0){
      this.updateTitleCharsRemaining( value );
    this.setState({ eventTitle: value });
  }
  };

  eventDescriptionChange = value => {
    this.setState({ eventDescription: value });
  };
  updateTitleCharsRemaining( value ) {
    this.setState({ titleCharsRemaining: this.titleMaxChars - value.length });
    ;
}

updateMonitorEventImages=(value)=>{
    let arr = this.state.monitorEventImages.slice()
      arr.push(value)
      this.setState({monitorEventImages: arr})
  }


  _handleImageChange = e => {
    if (this.state.images.length === 4 ) {
       this.setState({ uploadButtonStatus: 'disabled' })
     // console.log("limit exceeded: ", this.state.images.length);
      return;
    } else {
       this.setState({ uploadButtonStatus: 'active' })
     // console.log("this.state.images.length: ", this.state.images.length);
    }
    let arr = [];
   
    let reader = new FileReader();
    let img = e.target.files[0];


    let that = this;
    new ImageCompressor(img, {
      quality: 0.3, //signifies how much quality you want on the photo
      success(result) {
        let newArr = that.state.resizedImages.slice();
        // console.log('hit resized ')
        newArr.push(result);
        that.setState({
          resizedImages: newArr
        });
      }
    });
    reader.addEventListener("load", () => {
      arr = this.state.images.slice();
    
      arr.push({
       
        url: reader.result
      });
      // console.log("arr: ", arr.length);
      if (arr.length == 4) {
      //  console.log("condition met");
        this.setState({ uploadButtonStatus: "disabled" });
      }
      this.setState({
        images: arr
      });
    });
    img && reader.readAsDataURL(img);
  };

  updateEventImages=(img)=>{
   let arr =  this.state.images.slice();
    arr.push(img)
    this.setState({images: arr})
  }

  removeImages = index => {
    if (this.state.uploadButtonStatus === "disabled") {
      this.setState({ uploadButtonStatus: "active" });
    }
    let arr = this.state.images.slice();
    let arr2 = this.state.resizedImages.slice();
    arr.splice(index, 1);
    arr2.splice(index, 1);
    this.setState({ images: arr });
    this.setState({ resizedImages: arr2 });
  };

  updateDisabled=(value)=>{
      this.setState({
        editEventuploadButtonStatus: value
      })
  }

  updateButton=(value)=>{
    this.setState({
      uploadButtonStatus: value
    })

  }

  removeImagesEvents = index =>{
    this.setState({editEventuploadButtonStatus:'active', uploadButtonStatus:'active'})
    let arr1 = this.state.monitorEventImages.slice()
    let arr = this.state.images.slice();
    arr1.splice(index, 1)
    arr.splice(index,1)
    this.setState({images: arr, monitorEventImages: arr1})
  }

  componentDidMount() {
    this.props.getStoryById(this.props.match.params.story_id)
      .then(response => {
        let {story_title, story_description, story_category} =response.value.data
        this.setState({
          storyTitle: story_title,
          storyDescription: story_description,
          storyCategory: story_category
        })
      });
    this.props.likeCount(this.props.match.params.story_id);
    this.props.likeCheck(
      this.props.user.user_id,
      this.props.match.params.story_id
    );
  }

  saveEdit(newTitle, newDescription, newCategory) {
    this.setState({
      storyTitle: newTitle,
      storyDescription: newDescription,
      storyCategory: newCategory
    })
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

  toggleEditEventModal(event_id) {
    const { events } = this.props.story;
    const selectedEvent = events.filter(event=>{
       return event_id==event.event_id
     })

     
     
     if (this.state.editEventModalMode === "hidden") {
       this.setState({ editEventModalMode: "visible", editModalMode: "hidden", 
       modalMode: "hidden", eventTitle:selectedEvent[0].event_title,
       eventDescription:selectedEvent[0].event_description,images:selectedEvent[0].e_urls,editEventuploadButtonStatus:'active',monitorEventImages: selectedEvent[0].e_urls,
        eventID: event_id
      });
       
      setTimeout(()=>this.setState({titleCharsRemaining: 40-this.state.eventTitle.length}),100) 
    } else {
      this.setState({ editEventModalMode: "hidden",imgUrl:[],eventTitle:'', eventDescription:'', images:[],titleCharsRemaining: 40,monitorEventImages: [] });
    } 
    let that = this;
        function check(){
          if(that.state.images.length==4){
            that.setState({editEventuploadButtonStatus:'disabled',})
         }
        }
        setTimeout(()=>check(),50)
  }

  deleteStoryHandler() {
    this.props.deleteStory(+this.props.match.params.story_id)
      .then(this.props.history.push(`/profile/${this.props.user.user_id}`));
  }

  addLikeHandler() {
    // console.log("handler fired");
    this.props
      .addLike(this.props.user.user_id, this.props.match.params.story_id)
      .then(() => this.props.likeCount(this.props.match.params.story_id))
      .then(() => this.props.likeCheck(
        this.props.user.user_id,
        this.props.match.params.story_id
      ));
  }

  unlikeHandler() {
    this.props
      .unlike(this.props.user.user_id, this.props.match.params.story_id)
      .then(() => this.props.likeCount(this.props.match.params.story_id))
      .then(() => this.props.likeCheck(
        this.props.user.user_id,
        this.props.match.params.story_id
      ));
  }

  render() {
    
    // console.log('this.props: ', this.props);

    const { story } = this.props;
    const { user } = this.props;

    if (story.events) {
      var mappedEvents = story.events.reverse().map((event,index) => {
        // console.log(event);
        return (
          <Fragment key={index}>
            <Event
               key={index}
              editEventModalMode={this.state.editEventModalMode}
              story_id={this.props.match.params.story_id}
              event_id={event.event_id}
              images={event.e_urls}
              story_userid={story.user_id}
              event_title={event.event_title}
              event_description={event.event_description}
              e_created_on={event.e_created_on}
              event_id={event.event_id}
              selectedEvent={this.state.selectedEvent}
              toggleEditEventModal={this.toggleEditEventModal}
              eventTitleChange={this.eventTitleChange}
              eventDescriptionChange={this.eventDescriptionChange}
              title={this.state.eventTitle}
              eventDescription={this.state.eventDescription}
              eventImages={this.state.images}
              removeImages={this.state.removeImages}


              updateImgUrl= {this.updateImgUrl}
              titleCharsRemaining={this.state.titleCharsRemaining}
              removeImagesEvents={this.removeImagesEvents}
              _handleImageChange={this._handleImageChange}
              removeImages={this.removeImages}
              resizedImages={this.state.resizedImages}
              uploadButtonStatus={this.state.uploadButtonStatus}
              updateEventImages={this.updateEventImages}
              updateDisabled={this.updateDisabled}
              editEventuploadButtonStatus={this.state.editEventuploadButtonStatus}
              updateButton={this.updateButton}
              updateMonitorEventImages={this.updateMonitorEventImages}
              monitorEventImages={this.state.monitorEventImages}
              eventID={this.state.eventID}
              imgUrl={this.state.imgUrl}
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
              {this.state.storyTitle}{" "}
              <span className="byline">by {story.display_name}</span>
            </h1>
            <p className="page-description story-description">
              {this.state.storyDescription}
            </p>
            <div className="follow-info-wrap">
            {!this.props.user.user_id ? (
                <span className="follow-btn btn">Likes</span>
              ) : this.props.user.user_id && !this.props.check ? (
                <button
                  onClick={() => this.addLikeHandler()}
                  className="follow-btn btn"
                >
                  {" "}
                  Like{" "}
                </button>
              ) : this.props.user.user_id && this.props.check ? (
                <button
                  onClick={() => {
                    this.unlikeHandler();
                  }}
                  className="follow-btn btn border-btn"
                >
                  Unlike
                </button>
              ) : null}
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
                  {` Delete "${this.state.storyTitle}"`}
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
            uploadButtonStatus={this.state.uploadButtonStatus}

          />

         

          <EditStoryModal
            editModalMode={this.state.editModalMode}
            toggleEditModal={this.toggleEditModal}
            eventTitleChange={this.eventTitleChange}
            eventDescriptionChange={this.eventDescriptionChange}
            saveEdit={this.saveEdit}
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
    likes: state.story.likeCount,
    check: state.story.likeCheck
  };
};

export default connect(
  mapStateToProps,
  { getStoryById, deleteStory, likeCount, addLike, unlike, likeCheck }
)(Story);