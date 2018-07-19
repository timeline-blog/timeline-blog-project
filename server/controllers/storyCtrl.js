const getStory = (req,res) =>{

  const story = req.app.get('db').story;

  const { story_id } = req.params

  story.getStoryById([story_id])
    .then(storys=>{
     
      story.getEventByStory([story_id])
        .then(events=>{
          res.status(200).json({
            user_id: storys[0].user_id,
            story_title: storys[0].story_title,
            story_description: storys[0].story_description,
            story_category: storys[0].story_category,
            like_count: storys[0].like_count,
            display_name: storys[0].display_name,
            avatar: storys[0].avatar,
            events:[...events]
          })

    
        })
    })
};

const addStory = (req, res) => {
  const {
    story_title,
    story_description,
    story_category,
    s_created_on,
    user_id
  } = req.body;

  req.app
    .get("db")
    .story.addStory([
      story_title,
      story_description,
      story_category,
      s_created_on,
      user_id
    ])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const editStory = (req, res) => {
  const {
    story_title,
    story_description,
    story_category,
    s_updated_on
  } = req.body;
  const { story_id } = req.params;

  req.app
    .get("db")
    .story.editStory([
      story_title,
      story_description,
      story_category,
      s_updated_on
    ])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const deleteStory = (req, res) => {
  const { story_id } = req.params;

  req.app
    .get("db")
    .story.deleteStory([story_id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const addLike = (req, res) => {
  const { user_id, story_id } = req.body;
  console.log(user_id, story_id);
  req.app
    .get("db")
    .likes.addLike([user_id, story_id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

const unlike = (req, res) => {
  console.log(req.query, "hit");
  const { story_id } = req.body;

  req.app
    .get("db")
    .likes.unlike([req.user.user_id, story_id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const likeCount = (req, res) => {
  const { story_id } = req.params;

  req.app
    .get("db")
    .likes.likeCount([story_id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

module.exports = {
  getStory,
  addStory,
  editStory,
  deleteStory,
  addLike,
  unlike,
  likeCount
}