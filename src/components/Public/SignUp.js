import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { emailSignUp } from '../../ducks/reducers/userReducer';

import axios from 'axios';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWarning from "@fortawesome/fontawesome-pro-solid/faExclamationTriangle";
import faGoogle from "@fortawesome/fontawesome-free-brands/faGoogle";
import faEnvelope from "@fortawesome/fontawesome-pro-solid/faEnvelope";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameField: '',
      emailField: '',
      passwordField: '',
      verifyPasswordField: '',
      errorMsg: ''
    };


    this.changeNameField = this.changeNameField.bind(this);
    this.changeEmailField = this.changeEmailField.bind(this);
    this.changePasswordField = this.changePasswordField.bind(this);
    this.changeVerifyPasswordField = this.changeVerifyPasswordField.bind(this);
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
  }

  changeNameField( value ) {
    this.setState({ nameField: value });
  }

  changeEmailField( value ) {
    this.setState({ emailField: value });
  }

  changePasswordField( value ) {
    this.setState({ passwordField: value });
  }

  changeVerifyPasswordField( value ) {
    this.setState({ verifyPasswordField: value });
  }
  
  handleClickSignUp() {
    // *TO DO: store error messages in array to map list of all errors at once.
    let { nameField, emailField, passwordField, verifyPasswordField } = this.state;

    if ( !nameField || !emailField || !passwordField || !verifyPasswordField ) {
      this.setState({ errorMsg: 'All fields are required.' });
      return false;
    }

    if ( passwordField !== verifyPasswordField) {
      this.setState({ errorMsg: 'Password fields do not match.' });
      return false;
    }

    if ( nameField.length < 4 || nameField.length > 30 ) {
      this.setState({ errorMsg: 'Display name must be between 4 and 30 characters' });
      return false;
    }

    if ( nameField.includes("'") || nameField.includes('"') 
          || emailField.includes("'") || emailField.includes('"')
          || passwordField.includes("'") || passwordField.includes('"')
          || verifyPasswordField.includes("'") || verifyPasswordField.includes('"')
        ) {
      this.setState({ errorMsg: "Fields cannot contain ' or \"" });
      return false;
    }

    if ( !emailField.includes('@') ) {
      this.setState({ errorMsg: "Invalid email address." });
      return false;
    }

    if ( passwordField.length < 6 || passwordField.length > 30 ) {
      this.setState({ errorMsg: 'Password must be between 6 and 30 characters' });
      return false;
    }

    if ( passwordField.includes("'") || passwordField.includes('"') ) {
      this.setState({ errorMsg: "Password cannot contain ' or \"" });
      return false;
    }

    let validFields = Object.assign({}, this.state, {
      display_name: nameField, 
      email: emailField, 
      password: passwordField
    });

    let display_name = validFields.display_name.trim();
    let email = validFields.email.trim();
    let password = validFields.password.trim();

    axios.post("/auth/signup", {display_name, email, password})
      .then( response => {
        this.props.history.push('/discover');
      })
      .catch( err => {
        console.log( 'sign up err: ', err.response.data );
        if ( err.response.data.errMessage === "Key (email)=(test@example.com) already exists." ) {
          this.setState({ errorMsg: "Email already exists."});
        }
      })
  }

  render() {
    return (
      <div className="outer-wrap login-wrap">
        <div className="inner-wrap">
          <header className="page-header login-header">
            <h1 className="page-title login-title">Sign Up</h1>
          </header> 

          <div className="login-form">
            <div className="google-login">
                <a href="http://localhost:3001/auth/google" className="btn login-btn">
                  <FontAwesomeIcon icon={faGoogle} /> &nbsp;
                  Sign Up with Google
                </a>
            </div>

            <div className="auth-form-separator">
                OR
            </div>

            {this.state.errorMsg !== '' 
              ? <p className="error-message"><FontAwesomeIcon icon={faWarning} /> {this.state.errorMsg}</p>
              : null
            }

            <div className="field-group">
              <label htmlFor="">Display Name</label>
              <input 
                onChange={(e) => this.changeNameField(e.target.value)} 
                className="main-input" 
                type="text"
                value={this.state.nameField} />
            </div>
            <div className="field-group">
              <label htmlFor="">Email</label>
              <input 
                onChange={(e) => this.changeEmailField(e.target.value)} 
                className="main-input" 
                type="email" 
                value={this.state.emailField} />
            </div>
            <div className="field-group">
              <label htmlFor="">Password</label>
              <input 
                onChange={(e) => this.changePasswordField(e.target.value)} 
                className="main-input" 
                type="password"
                value={this.state.passwordField}  />
            </div>
            <div className="field-group">
              <label htmlFor="">Verify Password</label>
              <input 
                onChange={(e) => this.changeVerifyPasswordField(e.target.value)} 
                className="main-input" 
                type="password"
                value={this.state.verifyPasswordField}/>
            </div>
            <button onClick={() => this.handleClickSignUp()} className="btn login-btn">
              <FontAwesomeIcon icon={faEnvelope} /> &nbsp;
              Sign Up with Email
            </button>
            <Link to="/login">Already have an account? Log in here</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(null, {emailSignUp})(SignUp);
