import React, { Component } from 'react';
import _ from 'lodash'

import FileUploader from 'react-firebase-file-uploader'
import firebase from '../../firebase'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";

export default class NewEventModal extends Component {

    constructor(){
        super()
        this.state={
            imgUrl: []
        }
    }

    startUploadManually =()=>{
       // this is to save the image upon successful upload
         this.props.resizedImages.forEach(element=>{
   
           this.FileUploader.startUpload(element)       
         })
        //  this.props.resizedImages.forEach(element=>{
        //     console.log(element)
        //     console.log(element.name)
        //     this.FileUploader.startUpload(element)  
        //  })

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

                   
                    console.log('hi')

                
       }

       createEvent =()=>{
           this.props.resizedImages.forEach(element=>{ 
               this.FileUploader.startUpload(element)   
            })

           
            
            
           const test = () =>{
                console.log('hi')
           }

           _.debounce(test,3000)
           
       }

    
    render() {
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
                            <input onChange={e=>this.props.eventTitleChange(e.target.value)} type="text" className="main-input"/>
                        </div>

                        <div className="field-group">
                            <label htmlFor="">Content</label>
                            <textarea onChange={e=>this.props.eventDescriptionChange(e.target.value)} type="text" rows="8" className="main-input"/>
                        </div>

                        <div className="field-group">
                    
                        <label className="btn border-btn images-label">
                            Add Images
                            <FileUploader 
                                hidden //this prop hides the defualt button. you can then wrap it in a custom label tag
                                accept="image/*"
                                name="avatar"
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

