import React, { Component } from "react";
import { connect } from "react-redux";
import UserSummary from "./UserSummary";
import _ from 'lodash';
import {
  getFollowers,
  getFollowing,
  unfollow,
  addFollow,
  searchUsers
} from "../../ducks/reducers/followsReducer";
import { getLoggedInUser } from '../../ducks/reducers/userReducer';

class MyFollowers extends Component {
  constructor() {
    super();
    this.state = {
      followersList: [],
      followingList: [],
      input: '',
      isOpen: false
    };

    this.handleAddFollow = this.handleAddFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.updateFollowingList = this.updateFollowingList.bind(this);
    this.updateFollowersList = this.updateFollowersList.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    // if (!this.props.user.user_id) {
      this.props.getLoggedInUser().then( () => {
        this.props
        .getFollowers(this.props.user.user_id)
        .then(() => this.updateFollowersList());
  
        this.props
          .getFollowing(this.props.user.user_id)
          .then(() => this.updateFollowingList());
        } );
    }
  // }

  updateFollowersList() {
    this.setState({ followersList: this.props.followers });
  }

  updateFollowingList() {
    this.setState({ followingList: this.props.following });
  }

  handleAddFollow(follower_id, following_id) {
    this.props.addFollow(follower_id, following_id).then(() => {
      this.props
        .getFollowing(this.props.user.user_id)
        .then(() => this.updateFollowingList());
    });
  }

  handleUnfollow(follower_id, following_id) {
    this.props.unfollow(follower_id, following_id).then(() => {
      this.props
        .getFollowing(this.props.user.user_id)
        .then(() => this.updateFollowingList());
    });
  }

  searchHandler(e){
    this.setState({
      input: e.target.value
    })
  };

  submitHandler(e){
    // console.log(e.target.value);

    this.setState({
      input: e.target.value
    });
    {
      if(this.state.input !== ''){
        this.props.searchUsers(this.state.input);
        // setTimeout(()=>this.props.searchUsers(this.state.input),1000);
        this.setState({
          isOpen: true
        });
      }
      else {
        this.props.searchUsers(null);
        this.setState({
          isOpen: false
        })
      }
    }
  };

  /**
   * Each user summary needs to know if logged in user follows the user being displayed:
   * 1. get logged in user_id
   * 2. get info for users following logged in user
   *    this.props.getFollowers( logged in user_id )
   * 3. since global "following" state is being mapped to props, we can use this.props.following to compare
   *    user_id of user being displayed with user_id of every user in this.props.following using filter;
   *    if the filtered array has a result, the UserSummary should take a prop indicating so (a boolean)
   * 4. UserSummary will need check the boolean to know whether to render "Follow" or "Unfollow"
   */

  render() {
    console.log(this.state);
    let followersList = this.state.followersList.map((follows) => {
      return (
        <UserSummary
          key={follows.user_id}
          userid={follows.user_id}
          display_name={follows.display_name}
          avatar={follows.avatar}
          unfollow={this.handleUnfollow}
          addFollow={this.handleAddFollow}
          user_id={follows.user_id}
          followingList={this.state.followingList}
        />
      );
    });

    const searchResults = this.props.searchResults.map((user) => {
      return (
        <UserSummary
          key={user.user_id}
          userid={user.user_id}
          display_name={user.display_name}
          avatar={user.avatar}
          unfollow={this.handleUnfollow}
          addFollow={this.handleAddFollow}
          user_id={user.user_id}
          followingList={this.state.followingList}
        />
      )
    });
    

    return (
      <div className="outer-wrap followers-wrap">
        <div className="inner-wrap">
          <div className="page-header followers-header">
            <h1 className="page-title">My Followers</h1>
            <input
              type="text"
              className="main-input"
              placeholder="Search users..."
              value={this.state.input}
              onChange={(e)=>{this.searchHandler(e)}}
              onKeyPress={(e)=>{this.submitHandler(e)}}
            />
          </div>

          <div className="followers-list-wrap">
          {this.state.isOpen ? searchResults : null}
            <h3 className="followers-list-title">
              {this.props.followers.length} followers
            </h3>
            {followersList}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    followers: state.follows.followers,
    following: state.follows.following,
    user: state.user.authedUser,
    searchResults: state.follows.searchResults
  };
};
export default connect(
  mapStateToProps,
  { getFollowers, getFollowing, unfollow, addFollow, searchUsers, getLoggedInUser }
)(MyFollowers);
