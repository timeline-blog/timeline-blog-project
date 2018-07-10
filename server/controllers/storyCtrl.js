

const getStory = (req,res) =>{

  const story = req.app.get('db').story;
   
  let arr = []

  const { story_id } = req.params

  story.getStoryById([story_id])
        .then(storys=>{
          console.log('story ',storys)
          story.getEventByStory([storys[0].story_id])
               .then(events=>{


                  if(events[0]){
                 story.getImagesByEvent([events[0].event_id])
                       .then(images=>{
                        // console.log('images: ', images);

                        let obj ={
                          story_title: storys[0].story_title,
                          story_description: storys[0].story_description,
                          story_category: storys[0].story_category,
                          like_count: storys[0].like_count,
                          display_name: storys[0].display_name,
                          avatar: storys[0].avatar,
                          events: [...events],
                          images: [...images]
                        }
                          console.log('obj',obj)
                         
                         res.status(200).json(obj)
                       })}else{

                        let obj ={
                          story_title: storys[0].story_title,
                          story_description: storys[0].story_description,
                          story_category: storys[0].story_category,
                          like_count: storys[0].like_count,
                          display_name: storys[0].display_name,
                          avatar: storys[0].avatar,                     
                        }
 
                         res.status(200).json(obj)

                       }
               })
          

        })

}






module.exports={
  getStory
}