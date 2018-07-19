const { groupBy } = require('lodash');

const getProfile = (req, res) => {

  const { user_id } = req.params;
  const profile = req.app.get('db').profile;

  profile.getUserStories(user_id)
    .then(story => {
      profile.getUserEvent(user_id)
        .then(event => {
          profile.getUserImage(user_id)
            .then(image => {
              let obj=[...story,...event,...image]
              let result = groupBy(obj,(elem)=>{
                return elem.story_id
              })
              res.status(200).json(result)
            })
        })
    })
};

const editUser = (req, res) => {


  const { display_name, bio, avatar } = req.body;
  // console.log('req.body: ', req.body);
  const { user_id } = req.params;

  req.app.get('db')
    .profile.editUser([display_name, bio, avatar, user_id])
    .then(response => {
      // console.log('edit response', response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

const getUserById = (req, res) => {
  const { user_id } = req.params;

  req.app.get('db')
    .profile.getUserById(user_id)
    .then(response => {
      // console.log('profile response     ',response);
      res.status(200).json(response)})
    .catch(err => console.log(err));
};

module.exports = {
  getProfile,
  editUser,
  getUserById
};