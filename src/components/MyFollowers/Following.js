import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import {
  getFollowing,
  unfollow,
  addFollow,
  searchUsers
} from "../../ducks/reducers/followsReducer";

class Following extends Component {
  constructor() {
    super();
    this.state = { 
      followingList: [],
      input: '',
      isOpen: false
    };

    this.handleAddFollow = this.handleAddFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.updateFollowingList = this.updateFollowingList.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.props
      .getFollowing(this.props.user.user_id)
      .then(() => this.updateFollowingList());
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

  render() {

    let followingList = this.state.followingList.map((follows, index) => {
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
            <h1 className="page-title">Following</h1>

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
            <h3 className="followers-list-title">
              {this.props.following.length} following
            </h3>
            {this.state.isOpen ? searchResults : null}
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
    user: state.user.authedUser,
    searchResults: state.follows.searchResults
  };
};
export default connect(
  mapStateToProps,
  { getFollowing, unfollow, addFollow, searchUsers }
)(Following);
