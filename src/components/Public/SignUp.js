import React, { Component } from "react";

import { Link } from 'react-router-dom';

class SignUp extends Component {
  render() {
    return (
      <div className="outer-wrap login-wrap">
        <div className="inner-wrap">
          <header className="page-header login-header">
            <h1 className="page-title login-title">Sign Up</h1>
          </header> 

          <div className="login-form">
            <div className="google-login">
                <button className="btn login-btn">Sign Up with Google</button>
            </div>

            <div className="auth-form-separator">
                OR
            </div>

            <div className="field-group">
              <label htmlFor="">Display Name</label>
              <input className="main-input" type="text" />
            </div>
            <div className="field-group">
              <label htmlFor="">Email</label>
              <input className="main-input" type="text" />
            </div>
            <div className="field-group">
              <label htmlFor="">Password</label>
              <input className="main-input" type="password" />
            </div>
            <div className="field-group">
              <label htmlFor="">Verify Password</label>
              <input className="main-input" type="text" />
            </div>
            <button className="btn login-btn">Sign Up with Email</button>
            <Link to="/login">Already have an account? Log in here</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default SignUp;
