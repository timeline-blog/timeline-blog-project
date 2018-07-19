import axios from "axios";

const GET_FOLLOWERS = "GET_FOLLOWERS";
const GET_FOLLOWING = "GET_FOLLOWING";
const ADD_FOLLOW = "ADD_FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const FOLLOW_CHECK = "FOLLOW_CHECK";
const GET_FOLLOWER_COUNT = "GET_FOLLOWER_COUNT";

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
<<<<<<< HEAD
=======
  // console.log( 'addFollow invoked on followsReducer: ', follower_id, following_id );
>>>>>>> master
  return {
    type: ADD_FOLLOW,
    payload: axios.post("/api/people/follow", { follower_id, following_id })
  };
}

export function unfollow(follower_id, following_id) {
  // console.log( 'unfollow invoked on followsReducer: ', follower_id, following_id );
  return {
    type: UNFOLLOW,
    payload: axios.post("/api/people/unfollow", { follower_id, following_id })
  };
}

export function followCheck(follower_id, following_id) {
  return {
    type: FOLLOW_CHECK,
    payload: axios.post("/api/followcheck", { follower_id, following_id })
  };
}

export function getFollowerCount(user_id) {
  return {
    type: GET_FOLLOWER_COUNT,
    payload: axios.get(`/api/followercount/${user_id}`)
  };
}

const initialState = {
  followers: [],
  following: [],
  followCheck: {},
  followerCount: 0
};

export default function followsReducer(state = initialState, action) {
  // console.log('PAYLOAD!!!    ', action.payload);
  // console.log('TYPE!!!    ', action.type);

  switch (action.type) {
    case `${GET_FOLLOWERS}_FULFILLED`:
      return { ...state, followers: action.payload.data };
    case `${GET_FOLLOWING}_FULFILLED`:
      return { ...state, following: action.payload.data };
    case `${ADD_FOLLOW}_FULFILLED`:
    case `${UNFOLLOW}_FULFILLED`:
      return { ...state };
    case `${FOLLOW_CHECK}_FULFILLED`:
      return {
        ...state,
        followCheck: action.payload.data[0]
      };
    case `${GET_FOLLOWER_COUNT}_FULFILLED`:
      return {
        ...state,
        followerCount: action.payload.data[0].count
      };
    default:
      return state;
  }
}
