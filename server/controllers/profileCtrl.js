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

module.exports = {
  getProfile
};