import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";

import { createStory } from '../ducks/reducers/storyReducer';

class NewStoryModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storyTitleField: '', 
            storyDescriptionField: '', 
            selectedCategory: '',
            titleCharsRemaining: 40,
            descriptionCharsRemaining: 300
        };

        this.titleMaxChars = 40;
        this.descriptionMaxChars = 300;

        this.switchCategory = this.switchCategory.bind(this);
        this.updateTitleCharsRemaining = this.updateTitleCharsRemaining.bind(this);
        this.updateDescriptionCharsRemaining = this.updateDescriptionCharsRemaining.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.submitStory = this.submitStory.bind(this);
    }

    switchCategory( category ) {
        this.setState({ selectedCategory: category });
    }

    updateTitleCharsRemaining( value ) {
        this.setState({
            titleCharsRemaining: this.titleMaxChars - value.length
        })
    }
    
    updateDescriptionCharsRemaining( value ) {
        this.setState({
            descriptionCharsRemaining: this.descriptionMaxChars - value.length
        })
    }
    
    handleTitleChange( value ) {
        if ( (this.titleMaxChars - value.length) >= 0 ) {
            this.updateTitleCharsRemaining( value );
            this.setState({ storyTitleField: value });
        }
    }
    
    handleDescriptionChange( value ) {
        if ( (this.descriptionMaxChars - value.length) >= 0 ) {
            this.updateDescriptionCharsRemaining( value );
            this.setState({ storyDescriptionField: value });
        }
    }

    submitStory() {
        let {storyTitleField, storyDescriptionField, selectedCategory} = this.state;
        let s_created_on = moment().format('MM/DD/YY, hh:mm')
        if(storyTitleField === '' || storyDescriptionField === '' || selectedCategory === ''){
            return;
        }else {
            this.props.createStory(storyTitleField, storyDescriptionField, selectedCategory, s_created_on, this.props.user.user_id)
            .then((response) => this.props.history.push(`/story/${response.value.data[0].story_id}`))
            .then(() => this.props.toggleModal());
            this.setState({
                storyTitleField: '', 
                storyDescriptionField: '', 
                selectedCategory: ''
            });
        }
    }


    render() {
        // console.log('STATE!!!   ', this.state);
        // console.log('PROPS!!!   ', this.props);
        return (
            <div className={`outer-modal ${this.props.modalMode}`}>
            <div className="inner-modal">

                <button onClick={() => this.props.toggleModal()} className="close-modal border-btn btn">
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <header className="modal-header">
                    <h3 className="modal-title">New Story</h3>
                </header>
                <div className="modal-body">
                    <div className="field-group">
                        <label htmlFor="">Story Title</label>
                        <input 
                            onChange={(e) => this.handleTitleChange(e.target.value)} 
                            type="text" 
                            className="main-input"
                            value={this.state.storyTitleField}/>
                        <span className="char-counter">{this.state.titleCharsRemaining} characters left</span>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Description</label>
                        <textarea 
                            onChange={(e) => this.handleDescriptionChange(e.target.value)}
                            type="text" 
                            rows="3" 
                            className="main-input"
                            value={this.state.storyDescriptionField}>
                        </textarea>
                        <span className="char-counter">{this.state.descriptionCharsRemaining} characters left</span>
                    </div>

                    <div className="field-group">
                        <label className="center-label" htmlFor="">Category</label>
                        <div className="categories-wrap">
                            <span 
                                className={this.state.selectedCategory === "Travel" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Travel
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Music" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Music
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Food" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Food
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Personal" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Personal
                            </span>
                            <span 
                                className={this.state.selectedCategory === "News" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                News
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Sports" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Sports
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Education" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Education
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Art" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Art
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Style" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Style
                            </span>
                            <span 
                                className={this.state.selectedCategory === "Entertainment" ? "category-selector selected" : "category-selector"}
                                onClick={(e) => this.switchCategory(e.target.innerText)}
                            >
                                Entertainment
                            </span>
                        </div>
                    </div>

                </div>
                <button className="btn create-event-btn" onClick={() => this.submitStory()}>Create Story</button>

            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.authedUser
    }
}

export default withRouter(connect(mapStateToProps, {createStory})(NewStoryModal));