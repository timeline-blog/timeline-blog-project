import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux'
import { getStoryById } from "../../ducks/reducers/storyReducer";
import { withRouter } from 'react-router'
import FileUploader from 'react-firebase-file-uploader'
import firebase from '../../firebase'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";


 class NewEventModal extends Component {

    constructor(){
        super()
        this.state={
            imgUrl: [],
            eventTitleField: '',
            eventDescriptionField: '',
            titleCharsRemaining: 40,
        };

        this.titleMaxChars = 40;
       
    }

    startUploadManually =()=>{
       // this is to save the image upon successful upload
         this.props.resizedImages.forEach(element=>{
           this.FileUploader.startUpload(element)       
         })
       

       }

       handleUploadSuccess=(filenmae)=>{
    
         firebase.storage()
                    .ref('events')
                    .child(filenmae)
                    .getDownloadURL()
                    .then(url=>{   
                        let img = this.state.imgUrl.slice();
                        img.push(url)
                        this.setState({imgUrl: img})
                    })
       }

       createEvent =()=>{
           if(this.props.title===''||this.props.eventDescription===''){
               return;
           }
           this.props.resizedImages.forEach(element=>{ 
               this.FileUploader.startUpload(element)   
            })
                let that = this;
           function soso(story_id,title,desc,img,user_id){
               let createdAt = moment().format('MM/DD/YY, hh:mm')
               let obj={
                   createdAt,
                   story_id,
                   title,
                   desc,
                   img,
                   user_id
               }
               axios.post(`/api/event/${story_id}`, obj)
                     .then(response=>{
                        that.props.getStoryById(that.props.match.params.story_id);
                         that.props && that.props.toggleModal()
                        })
              
           }

            setTimeout(()=>soso(this.props.story_id,this.state.eventTitleField,this.props.eventDescription,this.state.imgUrl, this.props.user.user_id), 1500)         
       }

    updateTitleCharsRemaining( value ) {
        this.setState({ titleCharsRemaining: this.titleMaxChars - value.length });
    }

    handleTitleChange( value ) {
        if ( (this.titleMaxChars - value.length) >= 0 ) {
            this.updateTitleCharsRemaining( value );
            this.setState({ eventTitleField: value });
        }
    }

    
    render() {
      //  console.log( this.state.eventTitleField )
        return (
            <div className={`outer-modal ${this.props.modalMode}`}>
                <div className="inner-modal">

                    <button onClick={() => this.props.toggleModal()} className="close-modal border-btn btn">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <header className="modal-header">
                        <h3 className="modal-title">New Event</h3>
                    </header>
                    <div className="modal-body">
                        <div className="field-group">
                            <label htmlFor="">Event Title</label>
                            <input 
                                value={this.state.eventTitleField} 
                                onChange={e=>this.handleTitleChange(e.target.value)} 
                                type="text" className="main-input"
                            />
                            <span className="char-counter">{this.state.titleCharsRemaining} characters left</span>
                        </div>

                        <div className="field-group">
                            <label htmlFor="">Content</label>
                            <textarea 
                                value={this.props.eventDescription} 
                                onChange={e=>this.props.eventDescriptionChange(e.target.value)} 
                                type="text" 
                                rows="8" 
                                className="main-input"/>
                        </div>

                        <div className="field-group">
                    
                        <label className={`btn border-btn images-label ${this.props.uploadButtonStatus}`}>
                            Add Images
                            <FileUploader 
                                hidden //this prop hides the defualt button. you can then wrap it in a custom label tag
                                accept="image/*"
                                name="avatar"
                                disabled={this.props.uploadButtonStatus === 'disabled' ? true : false }
                                storageRef={firebase.storage().ref('events')}
                                onChange={e=>this.props._handleImageChange(e)}
                                ref ={instance=>{this.FileUploader=instance}}
                                onUploadSuccess={this.handleUploadSuccess}
                            />
                            </label>
                            
                            {/* <button className="btn border-btn">Upload Images</button> */}
                        </div>
                        {this.props.images && this.props.images.map((element,index)=>(<img onClick={()=>this.props.removeImages(index)} key={index} src={element.url} height="150"  />))}
                    </div>
                    <button onClick={this.createEvent} className="btn create-event-btn">Create Event</button>

                </div>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        user: state.user.authedUser
    }
}

export default withRouter(connect(mapStateToProps,{getStoryById})(NewEventModal))