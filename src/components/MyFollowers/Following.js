import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import { getFollowing, unfollow, addFollow } from "../../ducks/reducers/followsReducer";

class Following extends Component {
  constructor() {
    super();
    this.state = { followingList: [] };

    this.handleAddFollow = this.handleAddFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.updateFollowingList = this.updateFollowingList.bind(this);
  }
  
  componentDidMount() {
    this.props.getFollowing(this.props.user.user_id)
      .then( () => this.updateFollowingList() )
  }
  
  updateFollowingList() {
    this.setState({ followingList: this.props.following })
  }

  handleAddFollow(follower_id, following_id) {
    console.log( 'addFollow invoked');
    this.props.addFollow(follower_id, following_id)
      .then( () => {
        this.props.getFollowing(this.props.user.user_id).then( () => this.updateFollowingList() )
      } );
  }

  handleUnfollow(follower_id, following_id) {
    console.log( 'unfollow invoked');
    this.props.unfollow(follower_id, following_id)
      .then( () => {
        this.props.getFollowing(this.props.user.user_id).then( () => this.updateFollowingList() )
      } );
  }

  render() {
    let followingList = this.state.followingList.map((follows, index) => {
      // console.log(follows);
      return (
        <UserSummary
          key={index}
          display_name={follows.display_name}
          avatar={follows.avatar}
          unfollow={this.handleUnfollow}
          addFollow={this.handleAddFollow}
          user_id={follows.user_id}
          followingList={this.state.followingList}
        />
      );
    });
    return (
      <div className="outer-wrap followers-wrap">
        <div className="inner-wrap">
          <div className="page-header followers-header">
            <h1 className="page-title">Following</h1>

            <input
              type="text"
              className="main-input"
              placeholder="Search users..."
            />
          </div>

          <div className="followers-list-wrap">
            <h3 className="followers-list-title">
              {this.props.following.length} following
            </h3>
            {followingList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    following: state.follows.following,
    user: state.user.authedUser
  };
};
export default connect(
  mapStateToProps,
  { getFollowing, unfollow, addFollow }
)(Following);
