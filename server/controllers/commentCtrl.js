const getComments = (req, res) => {
  const { event_id } = req.params;

  req.app.get('db')
    .comments.getComments([event_id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const addComment = (req, res) => {
  const { user_id, event_id, comment, c_created_on } = req.body;

  req.app.get('db')
    .comments.addComment([user_id, event_id, comment, c_created_on])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const editComment = (req, res) => {
  const { comment_id } = req.params;
  const { comment } = req.body;

  req.app.get('db')
    .comments.editComment([comment_id, comment])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const deleteComment = (req, res) => {
  const { comment_id } = req.params;

  req.app.get('db')
    .comments.deleteComment([comment_id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

module.exports = {
  getComments,
  addComment,
  editComment,
  deleteComment
};