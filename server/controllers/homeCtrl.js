
const getHome =(req,res) =>{
  const { user_id } = req.params;
  
  const home = req.app.get('db').home.following
        home.getStoriesByFollower([user_id])
            .then(story=>{
              
                home.getEventByStory([story[0].story_id])
                    .then(event=>{
                      
                      if(event[0]){
                        home.getImageByEvent([event[0].event_id])
                            .then(image=>{
                              let obj=[...story,...event,...image]
                              res.status(200).json(obj)
                            })
                        let obj=[...story,...event,...image]
                        res.status(200).json(obj)

                      } else{          
                        let obj=[...story]
                        res.status(200).json(obj)
                      }
                    })
            })
}


module.exports={
  getHome
}