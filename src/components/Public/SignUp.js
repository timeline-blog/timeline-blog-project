import React, { Component, Fragment } from "react";

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <div className="outer-wrap landing-wrap">
          <section className="welcome-wrap">
            <header className="welcome-header">
              <h1 className="welcome-title">Welcome to App Name</h1>
              {/* big logo */}
            </header>

            <div className="login-wrap">
              <div className="login-form">
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
                <button className="btn">Submit</button>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default SignUp;