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
  story_id,
  story_title,
  story_description,
  story_category,
  s_updated_on
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
  // console.log(story_id);
  return {
    type: DELETE_STORY,
    payload: axios.delete(`/api/story/${story_id}`)
  };
}

const GET_STORY_BY_ID = "GET_STORY_BY_ID";
const CREATE_STORY = "CREATE_STORY";
const EDIT_STORY = "EDIT_STORY";
const DELETE_STORY = "DELETE_STORY";

const initialState = {
  selectedStory: {}
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_STORY_BY_ID}_FULFILLED`:
    const { data } = action.payload
      return {
        ...state,
        selectedStory: data
      };
    case `${CREATE_STORY}_FULFILLED`:
      return { ...state };
    case `${EDIT_STORY}_FULFILLED`:
      return { ...state };
    case `${DELETE_STORY}_FULFILLED`:
      return { ...state };
    default:
      return state;
  }
}
