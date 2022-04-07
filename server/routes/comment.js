const router = require("express").Router();
const Comment = require("../api/db/models/Comment")

router.post('/addcomment', async (req,res)=>{
  const addComment = new Comment(req.body);
  try{
     const savedComment = await addComment.save();
     res.status(200).json(savedComment);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;