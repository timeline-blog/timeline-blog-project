import axios from "axios";


const initialState = {
  authedUser: []
};

const EDIT_USER = "EDIT_USER";
const GET_LOGGEDIN_USER = 'GET_LOGGEDIN_USER'

export function editUser(display_name, bio, avatar, user_id) {
  return {
    type: EDIT_USER,
    payload: axios.put(`/api/user/${user_id}`, display_name, bio, avatar)
  };
}

export function getLoggedInUser(){
  return {
      type: GET_LOGGEDIN_USER,
      payload: axios.get(`/auth/loggedIn`)
  }
}

export default function userReducer(state = initialState, action) {
 // console.log(action.payload)
  switch (action.type) {
    case `${EDIT_USER}_FULFILLED`:
      return { ...state };

    case `${GET_LOGGEDIN_USER}_FULFILLED`:
    
      const {data} = action.payload
      return {
        ...state, authedUser:data
       }
    default:
      return state;
  }
}
