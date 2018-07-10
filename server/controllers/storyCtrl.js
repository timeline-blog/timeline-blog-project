

const getStory = (req,res) =>{
  const story = req.app.get('db').story;
  
  let arr = []

  const { story_id } = req.params

  story.getStoryById('')
        .then(story=>{
          story.getEventByStory([story[0].story_id])
               .then(events=>{

            

                 story.getImagesByEvent([events[0].event_id])
                       .then(images=>{

                        let obj ={
                          story_title: story[0].story_title,
                          story_description: story[0].story_description,
                          story_category: story[0].story_category,
                          like_count: story[0].like_count,
                          display_name: story[0].display_name,
                          avatar: story[0].avatar,
                          events: [
                            ...events,
                            images
                          ]
                        }
                          console.log(obj)
                         res.status(200).json(obj)
                       })
               })
          

        })

}






module.exports={

}