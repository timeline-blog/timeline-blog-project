const createEvent =(req,res) =>{
  const { title, desc, createdAt, img, user_id} = req.body;
  const { story_id } = req.params
  // console.log(user_id)

  const event = req.app.get('db').event;
  //user_id, event title, event desc, created on

    event.addEvent([title,desc,createdAt,user_id,story_id])
            .then(response=>{
                  event.addEventImage([response[0].event_id,img,response[0].story_id])
                       .then(response=>res.status(200).json('done'))
            })
}


module.exports={
  createEvent
}