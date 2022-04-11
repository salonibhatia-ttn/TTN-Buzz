const router = require("express").Router();
const Comment = require("../api/db/models/Comment")
 
//creating comment
router.post('/addcomment', async (req,res)=>{
  const addComment = new Comment(req.body);
  try{
     const savedComment = await addComment.save();
     res.status(200).json(savedComment);
  } catch(err) {
    res.status(500).json(err);
  }
});

//Updating comment
router.put('/updatecomment/:id' , async (req,res) => {
  try{
    const comment = await Comment.findById(req.params.id);
    if(comment.postId === req.body.postId) {
      await comment.updateOne({$set: req.body});
      res.status(200).json("Your comment has been updated.");
    }else {
      res.status(403).json("You can update only your own comment");
    }
  } catch (err) {
    res.status(500).json(err);
  } 
});
 
//deleting post
router.delete('/deletecomment/:id' , async (req,res) => {
  try{
    const comment = await Comment.findById(req.params.id);
    if(comment.userId === req.body.userId) {
      await comment.deleteOne();
      res.status(200).json("Your comment has been deleted.");
    }else {
      res.status(403).json("You can delete only your own comment");
    }
  } catch (err) {
    res.status(500).json(err);
  } 
});

//get a comment
router.get('/getcomment/:id', async (req,res) => {
  try{
    const comment =  await Comment.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;