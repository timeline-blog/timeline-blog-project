import React, { Component } from 'react';
import { connect } from 'react-redux'
import ImageCompressor from "image-compressor.js";
import FileUploader from 'react-firebase-file-uploader'
import firebase from '../../firebase'


import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";
import { read } from 'fs';


class EditEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: [],
            eventTitleField: '',
            eventDescriptionField: '',
            titleCharsRemaining: 40,
            resizedImages: [],
            uploadButtonStatus:"active"
        };

        this.titleMaxChars = 40;
    }

    handleUploadSuccess=(filenmae)=>{
    
        // firebase.storage()
        //            .ref('events')
        //            .child(filenmae)
        //            .getDownloadURL()
        //            .then(url=>{   
        //                let img = this.state.imgUrl.slice();
        //                img.push(url)
        //                this.setState({imgUrl: img})
        //            })
      }

      startUploadManually =()=>{
        // this is to save the image upon successful upload
          this.state.resizedImages.forEach(element=>{
            this.FileUploader.startUpload(element)       
          })
        
 
        }

        _handleImageChange = e => {
            if (this.props.eventImages.length == 4 ) {
              // this.setState({ uploadButtonStatus: 'disabled' })
             // console.log("limit exceeded: ", this.state.images.length);
              return;
            } else {
              // this.setState({ uploadButtonStatus: 'active' })
             // console.log("this.state.images.length: ", this.state.images.length);
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
                this.props.updateEventImages(reader.result)
            //   arr = this.state.images.slice();
            //   id++;
            //   arr.push({
            //     id: id,
            //     url: reader.result
            //   });
            //  console.log("arr: ", arr.length);
              if (this.props.eventImages.length == 4) {
              //  console.log("condition met");
                this.setState({ uploadButtonStatus: "disabled" });
              }
            //   this.setState({
            //     images: arr
            //   });
            });
            img && reader.readAsDataURL(img);
          };

    changeTitleField( value ) {
        this.setState({ eventTitleField: value });
    }

    changeContentField( value ) {
        this.setState({ eventContentField: value });
    }

    render() { 
       // console.log(this.props.selectedEvent)      
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
                            
                            className="main-input"
                            onChange={(e) => this.props.eventTitleChange(e.target.value)}
                             value={this.props.event_title}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Content</label>
                        <textarea 
                            rows="8" 
                            className="main-input"
                             onChange={(e) => this.props.eventDescriptionChange(e.target.value)}
                             value={this.props.event_description}
                        />
                    </div>

                    <div className="field-group">
                    <label className={`btn border-btn images-label ${this.props.uploadButtonStatus}`}>
                    Add Images
                    <FileUploader 
                        hidden //this prop hides the defualt button. you can then wrap it in a custom label tag
                        accept="image/*"
                        name="avatar"
                        disabled={this.state.uploadButtonStatus === 'disabled' ? true : false }
                        storageRef={firebase.storage().ref('events')}
                        onChange={e=>this._handleImageChange(e)}
                        ref ={instance=>{this.FileUploader=instance}}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                    </label>
                        {/* <button className="btn border-btn">Add Image</button> */}
                    </div>
                    {this.props.eventImages.map((element, index)=>{
                        return (<img height="150" key={index}  src={element}/> )
                    }) }
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