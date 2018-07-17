import axios from "axios";

const GET_STORIES_BY_FOLLOWING = "GET_STORIES_BY_FOLLOWING";
const GET_STORIES_BY_LIKED = "GET_STORIES_BY_LIKED";
const GET_STORIES_DISCOVER_ALL = "GET_STORIES_DISCOVER_ALL";
const GET_STORIES_BY_USER = "GET_STORIES_BY_USER";
const GET_STORIES_BY_CATEGORY = "GET_STORIES_BY_CATEGORY";

export function getStoriesByFollowing(user_id) {
  return {
    type: GET_STORIES_BY_FOLLOWING,
    payload: axios.get(`/api/likes/${user_id}`)
  };
}

export function getStoriesByLikedUser(user_id) {
  // console.log(user_id);
  return {
    type: GET_STORIES_BY_LIKED,
    payload: axios.get(`/api/home/${user_id}`)
  };
}

export function getStoriesByUser(user_id) {
  return {
    type: GET_STORIES_BY_USER,
    payload: axios.get(`/api/profile/${user_id}`)
  };
}

export function getStoriesDiscoverAll() {
  return {
    type: GET_STORIES_DISCOVER_ALL,
    payload: axios.get("/api/discover/all")
  };
}

export function getStoriesByCategory(category) {
  return {
    type: GET_STORIES_BY_CATEGORY,
    payload: axios.get(`/api/discover/sort/${category}`)
  };
}
const initialState = {
  storiesByFollowing: {},
  storiesByLiked: {},
  storiesByUser: {},
  storiesDiscoverAll: {},
  storiesByCategory: {}
};

export default function previewsReducer(state = initialState, action) {
  // console.log('PAYLOAD!!!    ', action.payload);
  // console.log('TYPE!!!    ', action.type);
  switch (action.type) {
    case `${GET_STORIES_BY_FOLLOWING}_FULFILLED`:
      return { ...state, storiesByFollowing: action.payload.data };
    case `${GET_STORIES_BY_USER}_FULFILLED`:
      return { ...state, storiesByUser: action.payload.data };
    case `${GET_STORIES_DISCOVER_ALL}_FULFILLED`:
      return { ...state, storiesDiscoverAll: action.payload.data };
    case `${GET_STORIES_BY_LIKED}_FULFILLED`:
      return { ...state, storiesByLiked: action.payload.data };
    case `${GET_STORIES_BY_CATEGORY}_FULFILLED`:
      return { ...state, storiesByCategory: action.payload.data };
    default:
      return state;
  }
}
