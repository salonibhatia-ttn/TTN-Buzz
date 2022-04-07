const router = require("express").Router();
const Post = require("../api/db/models/Post")

router.post('/addpost', async (req,res)=>{
  const addPost = new Post(req.body);
  try{
     const savedPost = await addPost.save();
     res.status(200).json(savedPost);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;