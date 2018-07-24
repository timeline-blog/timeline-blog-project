import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Discover from "../Discover";

import logo from "../../logo1.png";

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <div className="outer-wrap landing-wrap">
          <div className="page-title">
            <h1 className="title-wrap">
              <span className="welcome-title">Welcome to</span> 
              <img className="site-logo" src={logo} alt="Qroniqle Logo" />
            </h1>
          </div>
          <section className="welcome-wrap">
            <header className="welcome-header">
              {/* big logo */}

              {/* <div className="login-wrap">
                <Link to="/signup" className="btn login-btn">
                  Sign Up
                </Link>
                <Link to="/login" className="btn border-btn login-btn">
                  Log In
                </Link>
              </div> */}

            </header>
          </section>
        </div>
        <Discover />
      </Fragment>
    );
  }
}

export default Landing;
