const { groupBy } = require('lodash');

const getFiltered = (req, res) => {

  const { category } = req.params;
  const discover = req.app.get('db').discover.get_sorted;

  discover.getFilteredStories([category])
      .then(story => {
        discover.getFilteredEvent([category])
          .then(event => {
            // discover.getFilteredImage([category])
            //   .then(image => {
             //   console.log(event)
            // console.log(event)
                let obj=[...story,...event]
                let result = groupBy(obj,(elem)=>{
                  return elem.story_id
                })
              //  console.log(result)
                res.status(200).json(result)
            //  })
          })
      })
};

const getAll = (req, res) => {

  const { category } = req.params;
  const discover = req.app.get('db').discover.get_all;

  discover.getAllStories()
      .then(story => {
          discover.getAllEvent()
            .then(event => {
                // discover.getAllImage()
                //     .then(image => {
                      let obj=[...story,...event]
                      let result = groupBy(obj,(elem)=>{
                        return elem.story_id
                      })
                      res.status(200).json(result)
                   // })
            })
      })
};

module.exports = {
  getFiltered,
  getAll
};