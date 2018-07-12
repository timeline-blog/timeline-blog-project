import React, { Component } from 'react';

export default class NewEventModal extends Component {
    // constructor()
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
                        <input type="text" className="main-input"/>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Category</label>
                        <div className="categories-wrap">
                            <span className="category-selector selected">Category</span>
                            <span className="category-selector">Category</span>
                            <span className="category-selector">Category</span>
                            <span className="category-selector">Category</span>
                            <span className="category-selector">Category</span>
                            <span className="category-selector">Category</span>
                            <span className="category-selector">Category</span>
                        </div>
                    </div>

                </div>
                <button className="btn create-event-btn">Create Event</button>

            </div>
            </div>
        );
    }
}

