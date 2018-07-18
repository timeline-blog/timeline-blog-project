const getFollowing = (req, res) => {
  const follow = req.app.get("db").follows;
  const { user_id } = req.params;

  follow.getFollowing([user_id]).then(response => {
    res.status(200).json(response);
  });
};

const getFollowers = (req, res) => {
  const follow = req.app.get("db").follows;
  const { user_id } = req.params;

  follow.getFollowers([user_id]).then(response => {
    res.status(200).json(response);
  });
};

const addFollow = (req, res) => {
  const follow = req.app.get("db").follows;
  const { user_id, following_id } = req.body;
  //follow_id is same as user id
  follow.addFollow([user_id, following_id]).then(response => {
    follow.getFollowing([user_id]).then(response => {
      res.status(200).json(response);
    });
  });
};

const unfollow = (req, res) => {
  const follow = req.app.get("db").follows;
  const { user_id, following_id } = req.body;
  follow.unfollow([user_id, following_id]).then(response => {
    follow.getFollowing([user_id]).then(response => {
      res.status(200).json(response);
    });
  });
};

const followCheck = (req, res) => {
  req.app.get('db')
  .follows.followCheck([req.body.follower_id, req.body.following_id])
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err));
};

const getFollowerCount = (req, res) => {
  req.app.get('db')
  .follows.getFollowerCount([req.params.user_id])
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err));
};

module.exports = {
  getFollowing,
  getFollowers,
  addFollow,
  unfollow,
  followCheck,
  getFollowerCount
};
