import React, { Component } from 'react';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";

export default class EditStoryModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storyTitleField: 'Story title here', // *TO DO: change this to actual story title
            storyDescriptionField: 'Story description here', // *TO DO: change this to actual story description
            selectedCategory: 'Food' // *TO DO: change this to actual story category
        };

        this.switchCategory = this.switchCategory.bind(this);
        this.changeStoryTitleField = this.changeStoryTitleField.bind(this);
        this.changeStoryDescriptionField = this.changeStoryDescriptionField.bind(this);
    }

    switchCategory( category ) {
        console.log(category)
        this.setState({ selectedCategory: category });
    }

    changeStoryTitleField( value ) {
        this.setState({ storyTitleField: value });
    }

    changeStoryDescriptionField( value ) {
        this.setState({ storyDescriptionField: value });
    }

    render() {
        return (
            <div className={`outer-modal ${this.props.editModalMode}`}>
            <div className="inner-modal test">

                <button onClick={() => this.props.toggleEditModal()} className="close-modal border-btn btn">
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <header className="modal-header">
                    <h3 className="modal-title">Edit Story</h3>
                </header>
                <div className="modal-body">
                    <div className="field-group">
                        <label htmlFor="">Story Title</label>
                        <input 
                            onChange={(e) => this.changeStoryTitleField(e.target.value)} 
                            type="text" 
                            className="main-input" 
                            value={this.state.storyTitleField}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Description</label>
                        <textarea 
                            onChange={(e) => this.changeStoryDescriptionField(e.target.value)} 
                            type="text" 
                            rows="3" 
                            className="main-input" 
                            value={this.state.storyDescriptionField}
                        ></textarea>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Category</label>
                        <div className="categories-wrap">
                            {/* <span className="category-selector selected">All</span> */}
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
                                className={this.state.selectedCategory === "Sport" ? "category-selector selected" : "category-selector"}
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
                <button className="btn create-event-btn">Save Changes</button>

            </div>
            </div>
        );
    }
}

