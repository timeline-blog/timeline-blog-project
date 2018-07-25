import React, { Component } from 'react';
import { connect } from 'react-redux';

import {editUser} from '../../ducks/reducers/userReducer';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-pro-light/faTimes";

class EditProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayNameField: '', 
            bioField: '', 
            avatarUrl: '',
            user_id: ''
        };

        this.changeAvatar = this.changeAvatar.bind(this);
        this.changeDisplayName = this.changeDisplayName.bind(this);
        this.changeBio = this.changeBio.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        this.setState({
            displayNameField: this.props.display_name, 
            bioField: this.props.bio, 
            avatarUrl: this.props.avatar,
            user_id: this.props.user_id
        });
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
      this.props.editUser( this.state.displayNameField, this.state.bioField, this.state.avatarUrl, this.props.user.user_id )
        .then(() => this.props.saveUserEdit(this.state.displayNameField, this.state.bioField, this.state.avatarUrl));
    }


    render() {
      console.log('STATE!!!   ', this.state);
      console.log('PROPS!!!   ', this.props);
        return (
            <div className={`outer-modal ${this.props.modalMode}`}>
            <div className="inner-modal">

                <button onClick={() => this.props.toggleModal()} className="close-modal border-btn btn">
                    <FontAwesomeIcon icon={faTimes} />
                </button>

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
