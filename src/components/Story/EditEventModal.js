import React, { Component } from 'react';
import { connect } from 'react-redux'
import ImageCompressor from "image-compressor.js";
import FileUploader from 'react-firebase-file-uploader'
import axios from 'axios'

import { withRouter } from 'react-router'
import { getStoryById } from "../../ducks/reducers/storyReducer";

import firebase from '../../firebase'
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";



class EditEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: [],
            eventTitleField: '',
            eventDescriptionField: '',
            
            resizedImages: [],
            uploadButtonStatus:"active"
        };

      
    }

    handleUploadSuccess=(filenmae)=>{
    
        firebase.storage()
                   .ref('events')
                   .child(filenmae)
                   .getDownloadURL()
                   .then(url=>{
                       console.log(url)   
                       let img = this.state.imgUrl.slice();
                       this.props.updateImgUrl(url)
                       img.push(url)
                       this.setState({imgUrl: img})
                   
                   })
      }

    

        _handleImageChange = e => {
            if (this.props.eventImages.length == 4 ) {
            
              return;
            } 
            
            let reader = new FileReader();
            let img = e.target.files[0];
            
        
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
                that.props.updateMonitorEventImages(result)
              }
            });
            reader.addEventListener("load", () => {
                this.props.updateEventImages(reader.result)
           
              if (this.props.eventImages.length == 4) {
                this.props.updateDisabled('disabled')
                this.props.updateButton('disabled')
              }else {    
                  this.props.updateButton('active')
                  this.props.updateDisabled('active')
              }
          
            });
            img && reader.readAsDataURL(img);
          };

    changeTitleField( value ) {
        this.setState({ eventTitleField: value });
    }

    changeContentField( value ) {
        this.setState({ eventContentField: value });
    }

    updateEvent=()=>{
            let that =this;
          let arr1 =  this.props.monitorEventImages;
          let arr2 = this.state.resizedImages
            let arr3 = arr1.filter(element=>{
                return arr2.indexOf(element)!=-1
            })

            arr3.forEach(element=>{
                this.FileUploader.startUpload(element)
            })
            // console.log(selectedEvent)

             function update( event_title,event_description,imgUrl,imgUrl2, id ){
                        let arr = imgUrl.slice()
                        let arr2 = imgUrl2.slice().filter(element=> element.includes('https'))
                        arr2.forEach(element=>{
                            arr.push(element)
                        })
                        // console.log(arr)
                        // console.log(arr2)
                        // console.log(arr3)
                        //console.log(that.props.imgUrl)
                        let obj={
                        event_title,
                        event_description,
                        imgs: arr,
                        }
                 axios.put(`/api/event/${id}`, obj)
                      .then(response=>{
                        that.props.getStoryById(that.props.match.params.story_id);
                        that.props.toggleEditEventModal()
                      })
                  //console.log(obj) 
             }

            setTimeout(()=>update(this.props.event_title,this.props.event_description,this.state.imgUrl,this.props.eventImages,this.props.eventID), 1500)
           // setTimeout(()=>this.props.toggleEditEventModal(),1800)
            this.setState({imgUrl: []})
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
                        <span className="char-counter">{this.props.titleCharsRemaining} characters left</span>
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
                    <label className={`btn border-btn images-label ${this.props.editEventuploadButtonStatus}`}>
                    Add Images
                    <FileUploader 
                        hidden //this prop hides the defualt button. you can then wrap it in a custom label tag
                        accept="image/*"
                        name="avatar"
                        disabled={this.props.editEventuploadButtonStatus === 'disabled' ? true : false }
                        storageRef={firebase.storage().ref('events')}
                        onChange={e=>this._handleImageChange(e)}
                        ref ={instance=>{this.FileUploader=instance}}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                    </label> (4 images max)
                        {/* <button className="btn border-btn">Add Image</button> */}
                    </div>
                    <div className="added-images">
                    {this.props.eventImages.map((element, index)=>{
                        return (<img onClick={()=>this.props.removeImagesEvents(index)} height="100" key={index}  src={element}/> )
                    }) }
                    </div>
                </div>
               
                <button onClick={this.updateEvent} className="btn create-event-btn">Save Changes</button>
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

export default withRouter(connect(mapStateToProps,{getStoryById})(EditEventModal))