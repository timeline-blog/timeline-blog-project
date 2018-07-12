import axios from "axios";

const initialState = {
  authedUser: { user_id, bio, avatar, display_name }
};

const EDIT_USER = "EDIT_USER";

export function editUser(user_id) {
  return {
    type: EDIT_USER,
    payload: axios.put("/api/user/: user_id", editUser)
  };
}
