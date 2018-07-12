import axios from "axios";

const initialState = {
  authedUser: { user_id, bio, avatar, display_name }
};

const EDIT_USER = "EDIT_USER";

export function editUser(display_name, bio, avatar, user_id) {
  return {
    type: EDIT_USER,
    payload: axios
      .put(`/api/user/${user_id}`, display_name, bio, avatar)
      .then(results => {
        return results;
      })
      .catch(err => console.log(err))
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${EDIT_USER}`:
      return { ...state };
    default:
      return state;
  }
}
