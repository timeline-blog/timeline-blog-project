import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="outer-wrap login-wrap">
                <div className="inner-wrap">
                    <header className="page-header login-header">
                        <h1 className="page-title login-title">Log In</h1>
                    </header>
                    <div className="login-form">
                        <div className="google-login">
                            <a href="http://localhost:3001/auth/google" className="btn login-btn">Log In with Google</a>
                        </div>

                        <div className="auth-form-separator">
                            OR
                        </div>

                        <div className="field-group">
                            <label htmlFor="">Email</label>
                            <input className="main-input" type="text"/>
                        </div>
                        <div className="field-group">
                            <label htmlFor="">Password</label>
                            <input className="main-input" type="password"/>
                        </div>

                        <button className="btn login-btn">Log In with Email</button>
                        <Link to="/signup">Don't have an account? Sign up here</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;