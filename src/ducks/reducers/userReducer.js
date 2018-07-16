import axios from "axios";

const EDIT_USER = "EDIT_USER";
const GET_LOGGEDIN_USER = 'GET_LOGGEDIN_USER';
const GET_USER_BY_ID = "GET_USER_BY_ID";

export function editUser(display_name, bio, avatar, user_id) {
  return {
    type: EDIT_USER,
    payload: axios.put(`/api/user/${user_id}`, display_name, bio, avatar)
  };
};

export function getLoggedInUser(){
  return {
      type: GET_LOGGEDIN_USER,
      payload: axios.get(`/auth/loggedIn`)
  }
};

export function getUserById(user_id) {
  return {
    type: GET_USER_BY_ID,
    payload: axios.get(`/api/user/${user_id}`)
  }
};

const initialState = {
  authedUser: {},
  profileUser: {}
};

export default function userReducer(state = initialState, action) {
 console.log(action.payload)
  switch (action.type) {
    case `${EDIT_USER}_FULFILLED`:
      return { ...state };

    case `${GET_LOGGEDIN_USER}_FULFILLED`:
    
      const {data} = action.payload
      return {
        ...state, authedUser:data
       }

    case `${GET_USER_BY_ID}_FULFILLED`:
      return {
        ...state, 
        profileUser: action.payload.data[0]
      }

    default:
      return state;
  }
};
