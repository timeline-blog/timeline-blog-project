import React from "react";

export default (props) => {
  // console.log('props: ', props);

  return (
    <div className="comment">
      <img className="comment-avatar" src={props.avatar} alt={props.display_name} />
      <div className="comment-body">
        <p className="comment-date">{props.c_created_on}</p>
        <p className="comment-author">{props.display_name}:</p>
        <p className="comment-text">
          {props.comment}
        </p>
        {props.user.user_id === props.user_id ?
        <button onClick={() => props.deleteCommentHandler(props.comment_id)}>Delete</button>
        : null}
      </div>
    </div>
  );
};

