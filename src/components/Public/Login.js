import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { emailLogin } from '../../ducks/reducers/userReducer';

import axios from 'axios';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWarning from "@fortawesome/fontawesome-pro-solid/faExclamationTriangle";
import faGoogle from "@fortawesome/fontawesome-free-brands/faGoogle";
import faEnvelope from "@fortawesome/fontawesome-pro-solid/faEnvelope";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailField: '',
            passwordField: '',
            errorMsg: ''
        };

        this.changeEmailField = this.changeEmailField.bind(this);
        this.changePasswordField = this.changePasswordField.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    changeEmailField( value ) {
        this.setState({ emailField: value });
    }

    changePasswordField( value ) {
        this.setState({ passwordField: value });
    }

    handleLogIn() {
        let { emailField, passwordField } = this.state;

        if ( !emailField || !passwordField ) {
            this.setState({ errorMsg: 'All fields are required' });
            return false;
        }

        if ( !emailField.includes('@') ) {
            this.setState({ errorMsg: 'Invalid email address.' });
            return false;
        }

        if ( emailField.includes("'") || emailField.includes('"')
            || passwordField.includes("'") || passwordField.includes('"')
        ) {
            this.setState({ errorMsg: "Fields cannot contain ' or \"" });
            return false;
        }

        let email = emailField.trim();
        let password = passwordField.trim();

        axios.post('/auth/login', {email, password})
            .then( response => {
                this.props.history.push('/home');
            })
            .catch( err => {
                console.log( 'login err: ', err.response.data.errMessage );
            })
    }

    render() {
        return (
            <div className="outer-wrap login-wrap">
                <div className="inner-wrap">
                    <header className="page-header login-header">
                        <h1 className="page-title login-title">Log In</h1>
                    </header>
                    <div className="login-form">
                        <div className="google-login">
                            <a href="http://localhost:3001/auth/google" className="btn login-btn">
                                <FontAwesomeIcon icon={faGoogle} /> &nbsp;
                                Log In with Google
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
                            <label htmlFor="">Email</label>
                            <input 
                                className="main-input" 
                                type="email"
                                onChange={(e) => this.changeEmailField(e.target.value)}
                                value={this.state.emailField}
                            />
                        </div>
                        <div className="field-group">
                            <label htmlFor="">Password</label>
                            <input 
                                className="main-input" 
                                type="password"
                                onChange={(e) => this.changePasswordField(e.target.value)}
                                value={this.state.passwordField}
                            />
                        </div>

                        <button onClick={() => this.handleLogIn()} className="btn login-btn">
                            <FontAwesomeIcon icon={faEnvelope} /> &nbsp;
                            Log In with Email
                        </button>
                        <Link to="/signup">Don't have an account? Sign up here</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {emailLogin})(Login);