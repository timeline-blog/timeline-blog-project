const { groupBy } = require('lodash');

const getHome = (req,res) => {


  const { user_id } = req.params;
  const home = req.app.get('db').home.following

  home.getStoriesByFollower([user_id])
      .then(story => {
          home.getEventByStory([user_id])
            .then(event => {
                home.getImageByEvent([user_id])
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

const getLiked = (req,res) => {

  const { user_id } = req.params;
  const liked = req.app.get('db').home.liked_stories

  liked.getLikedStories([user_id])
      .then(story => {
          liked.getLikedEvent([user_id])
            .then(event => {
                liked.getLikedImage([user_id])
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

module.exports={
  getHome,
  getLiked
};