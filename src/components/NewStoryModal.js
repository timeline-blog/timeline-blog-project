import React, { Component } from 'react';

export default class NewStoryModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storyTitleField: '', 
            storyDescriptionField: '', 
            selectedCategory: ''
        };

        this.switchCategory = this.switchCategory.bind(this);
        this.changeStoryTitleField = this.changeStoryTitleField.bind(this);
        this.changeStoryDescriptionField = this.changeStoryDescriptionField.bind(this);
    }

    switchCategory( category ) {
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
            <div className={`outer-modal ${this.props.modalMode}`}>
            <div className="inner-modal">

                <button onClick={() => this.props.toggleModal()} className="close-modal border-btn btn">X</button>

                <header className="modal-header">
                    <h3 className="modal-title">New Story</h3>
                </header>
                <div className="modal-body">
                    <div className="field-group">
                        <label htmlFor="">Story Title</label>
                        <input type="text" className="main-input"/>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Description</label>
                        <textarea type="text" rows="3" className="main-input"></textarea>
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
                <button className="btn create-event-btn">Create Story</button>

            </div>
            </div>
        );
    }
}
