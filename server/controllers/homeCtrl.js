
const getHome =(req,res) =>{
  const { user_id } = req.params;
  const home = req.app.get('db').home.following
        home.getStoriesByFollower([user_id])
            .then(story=>{
                home.getEventByStory([story[0].story_id])
                    .then(event=>{
                      home.getImageByEvent([events[0].event_id])
                          .then(image=>{
                            
                            res.status(200).json(obj)
                          })
                    })
            })
}


module.exports={
  getHome
}