import axios from "axios";

export function getStoryById(user_id) {
  return {
    type: GET_STORY_BY_ID,
    payload: axios.get(`/api/story/${user_id}`)
  };
}

export function createStory(
  story_title,
  story_description,
  story_category,
  s_created_on,
  user_id
) {
  return {
    type: CREATE_STORY,
    payload: axios.post("/api/story", {
      story_title,
      story_description,
      story_category,
      s_created_on,
      user_id
    })
  };
}

export function editStory(
  story_title,
  story_description,
  story_category,
  s_updated_on,
  story_id
) {
  return {
    type: EDIT_STORY,
    payload: axios.put(`/api/story/${story_id}`, {
      story_title,
      story_description,
      story_category,
      s_updated_on
    })
  };
}

export function deleteStory(story_id) {
  return {
    type: DELETE_STORY,
    payload: axios.delete(`/api/story/${story_id}`)
  };
}

export function likeCount(story_id) {
  return {
    type: LIKE_COUNT,
    payload: axios.get(`/api/like/${story_id}`)
  };
}

export function addLike(user_id, story_id) {
  // console.log(user_id, story_id, "addlike");
  return {
    type: ADD_LIKE,
    payload: axios.post("/api/like", { user_id, story_id })
  };
}

export function unlike(user_id, story_id) {
  return {
    type: UNLIKE,
    payload: axios.post(`/api/unlike`, {user_id, story_id})
  };
}

export function likeCheck(user_id, story_id) {
  return {
    type: LIKE_CHECK,
    payload: axios.post("/api/likeCheck", { user_id, story_id })
  };
}

export function getComments(event_id) {
  return {
    type: GET_COMMENTS,
    payload: axios.get(`/api/comments/${event_id}`)
  };
}

export function addComment(user_id, comment, c_created_on, event_id) {
  return {
    type: ADD_COMMENT,
    payload: axios.post(`/api/comments/`, {user_id, comment, c_created_on, event_id})
  };
}

export function deleteComment(comment_id) {
  return {
    type: DELETE_COMMENT,
    payload: axios.delete(`/api/comments/${comment_id}`)
  };
}

const GET_STORY_BY_ID = "GET_STORY_BY_ID";
const CREATE_STORY = "CREATE_STORY";
const EDIT_STORY = "EDIT_STORY";
const DELETE_STORY = "DELETE_STORY";
const LIKE_COUNT = "LIKE_COUNT";
const ADD_LIKE = "ADD_LIKE";
const UNLIKE = "UNLIKE";
const LIKE_CHECK = "LIKE_CHECK";
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const initialState = {
  selectedStory: {},
  likeCount: 0,
  likeCheck: {},
  comments: []
};

export default function storyReducer(state = initialState, action) {
  console.log(action.type);
  console.log(action.payload);

  switch (action.type) {
    case `${GET_STORY_BY_ID}_FULFILLED`:
      return {
        ...state,
        selectedStory: action.payload.data
      };
    case `${CREATE_STORY}_FULFILLED`:
      return { ...state };
    case `${EDIT_STORY}_FULFILLED`:
      return { ...state };
    case `${DELETE_STORY}_FULFILLED`:
      return { ...state };
    case `${LIKE_COUNT}_FULFILLED`:
      return {
        ...state,
        likeCount: action.payload.data[0].count
      };
    case `${ADD_LIKE}_FULFILLED`:
      return { ...state };
    case `${UNLIKE}_FULFILLED`:
      return { ...state };
    case `${LIKE_CHECK}_FULFILLED`:
      return {
        ...state,
        likeCheck: action.payload.data[0]
      };
    case `${GET_COMMENTS}_FULFILLED`:
      return {
        ...state,
        comments: action.payload.data
      };
    case `${ADD_COMMENT}_FULFILLED`:
      return { ...state };
    case `${DELETE_COMMENT}_FULFILLED`:
      return { ...state };
    default:
      return state;
  }
}
