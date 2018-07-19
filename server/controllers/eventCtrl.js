const createEvent =(req,res) =>{
  const { title, desc, createdAt, img, user_id} = req.body;
  const { story_id } = req.params
  // console.log(user_id)

  const event = req.app.get('db').event;
  //user_id, event title, event desc, created on
    event.addEvent([title,desc,createdAt,user_id,story_id,img])
            .then(response=>res.status(200).json('done'))
}

const deleteEvent =(req,res)=>{
    const { event_id } = req.params
    const event = req.app.get('db').event;
   
      event.deleteEvent([event_id])
           .then(response=>{
             res.status(200).json('done')
           })
           .catch(console.log)
   
}


module.exports={
  createEvent,
  deleteEvent
}