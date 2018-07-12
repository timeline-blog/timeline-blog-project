import axios from "axios";
import { bindActionCreators } from "../../../node_modules/redux";

export function getFollowers(user_id) {
  return {
    type: GET_FOLLOWERS,
    payload: axios.get(`/api/people/followers/${user_id}`)
  };
}

export function getFollowing(user_id) {
  return {
    type: GET_FOLLOWING,
    payload: axios.get(`/api/people/following/${user_id}`)
  };
}

export function addFollow(follower_id, following_id) {
  return {
    type: ADD_FOLLOW,
    payload: axios.post("/api/people/follow", { follower_id, following_id })
  };
}

export function unfollow(follower_id, following_id) {
  return {
    type: UNFOLLOW,
    payload: axios.post("/api/people/unfollow", { follower_id, following_id })
  };
}

const initialState = {
  followers: [],
  following: []
};

const GET_FOLLOWERS = "GET_FOLLOWERS";
const GET_FOLLOWING = "GET_FOLLOWING";
const ADD_FOLLOW = "ADD_FOLLOW";
const UNFOLLOW = "UNFOLLOW";

export default function followsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_FOLLOWERS}_FULFILLED`:
      return { ...state, followers: action.payload };
    case `${GET_FOLLOWING}_FULFILLED`:
      return { ...state, following: action.payload };
    case `${ADD_FOLLOW}_FULFILLED`:
    case `${UNFOLLOW}_FULFILLED`:
      return { ...state };
    default:
      return state;
  }
}
