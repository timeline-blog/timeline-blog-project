import React from "react";
import moment from "moment";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-pro-solid/faTrash";

export default (props) => {
  // console.log('props: ', props);

  return (
    <div className="comment">
      <img className="comment-avatar" src={props.avatar} alt={props.display_name} />
      <div className="comment-body">
        <p className="comment-date">{moment(props.c_created_on).from(moment().format("MM/DD/YY, hh:mm"))}</p>
        <p className="comment-author">{props.display_name}:</p>
        <p className="comment-text">
          {props.comment}
        </p>
        {props.user.user_id === props.user_id ?
        <button className="edit-btn delete-btn" onClick={() => props.deleteCommentHandler(props.comment_id)}>
          <FontAwesomeIcon icon={faTrash} /> &nbsp; Delete
        </button>
        : null}
      </div>
    </div>
  );
};

