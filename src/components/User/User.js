import React, { Component } from "react";
import { Link } from "react-router-dom";

class User extends Component {
  render() {
    return (
      <div className="user-main-wrap">
        <img />
        <h1>User's name</h1>
        <section>Brief Description of user</section>
        <div className="buttonwrap">
          <button>Follow</button>
          <h3>follow counter</h3>
        </div>
        <div className="displayCards">
          <div>
            <img />
            <h1> story title goes here</h1>
            <h3>card info and like count</h3>
            <h4>latest development</h4>
            <h2>event title here</h2>
            <Link to="/">full story</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
