import axios from "axios";

const EDIT_USER = "EDIT_USER";
const GET_LOGGEDIN_USER = "GET_LOGGEDIN_USER";
const GET_USER_BY_ID = "GET_USER_BY_ID";
const CLEAR_USER = "CLEAR_USER";
const EMAIL_SIGNUP = "EMAIL_SIGNUP";

export function editUser(display_name, bio, avatar, user_id) {
  return {
    type: EDIT_USER,
    payload: axios.put(`/api/user/${user_id}`, {display_name, bio, avatar})
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

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: {}
  };
}

export function emailSignUp(display_name, email, password) {
  return {
    type: EMAIL_SIGNUP,
    payload: axios.post("/auth/signup", {display_name, email, password})
  }
}

const initialState = {
  authedUser: {},
  profileUser: {}
};

export default function userReducer(state = initialState, action) {
//  console.log(action.payload)
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

    case `${CLEAR_USER}_FULFILLED`:
      return {
        ...state, 
        authedUser: action.payload
      }

    default:
      return state;
  }
};
