import React, { Component } from 'react';
import { connect } from 'react-redux';

import {editUser} from '../../ducks/reducers/userReducer';

class EditProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayNameField: this.props.user.display_name, 
            bioField: this.props.user.bio, 
            avatarUrl: this.props.user.avatar
        };

        this.changeAvatar = this.changeAvatar.bind(this);
        this.changeDisplayName = this.changeDisplayName.bind(this);
        this.changeBio = this.changeBio.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    changeAvatar( value ) {
        this.setState({ avatarUrl: value });
    }

    changeDisplayName( value ) {
        this.setState({ displayNameField: value });
    }

    changeBio( value ) {
        this.setState({ bioField: value });
    }

    saveChanges() {
      this.props.editUser( this.state.displayNameField, this.state.bioField, this.state.avatarUrl, this.props.user.user_id );
    }


    render() {
      console.log('STATE!!!   ', this.state);
        return (
            <div className={`outer-modal ${this.props.modalMode}`}>
            <div className="inner-modal">

                <button onClick={() => this.props.toggleModal()} className="close-modal border-btn btn">X</button>

                <header className="modal-header">
                    <h3 className="modal-title">Edit Profile</h3>
                </header>
                <div className="modal-body">
                    <div className="field-group">
                        <label htmlFor="">Display Name</label>
                        <input type="text" className="main-input" value={this.state.displayNameField} onChange={(e) => this.changeDisplayName(e.target.value)}/>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Bio</label>
                        <textarea type="text" rows="3" className="main-input" value={this.state.bioField} onChange={(e) => this.changeBio(e.target.value)}></textarea>
                    </div>

                    <div className="field-group">
                        <label htmlFor="">Avatar Url</label>
                        <input type="text" className="main-input" value={this.state.avatarUrl} onChange={(e) => this.changeAvatar(e.target.value)}/>
                    </div>

                </div>
                <button className="btn create-event-btn" onClick={() => {
                  this.saveChanges();
                  this.props.toggleModal();
                }}>Save Profile</button>

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

export default connect(mapStateToProps, {editUser})(EditProfileModal);
