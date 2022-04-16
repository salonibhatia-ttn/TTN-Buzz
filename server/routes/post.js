const router = require("express").Router();
const Post = require("../api/db/models/Post");
const User = require("../api/db/models/User");
 
//create post
router.post('/addpost', async (req,res)=>{
  const addPost = new Post(req.body);
  try{
     const savedPost = await addPost.save();
     res.status(200).json(savedPost);
  } catch(err) {
    res.status(500).json(err);
  }
});

//Updating post
router.put('/updatepost/:id' , async (req,res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(post.userID === req.body.userID) {
      await post.updateOne({$set: req.body});
      res.status(200).json("Your response has been updated.");
    }else {
      res.status(403).json("You can update only your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  } 
});
 
//deleting post
router.delete('/deletepost/:id' , async (req,res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(post.userID === req.body.userID) {
      await post.deleteOne();
      res.status(200).json("Your response has been deleted.");
    }else {
      res.status(403).json("You can delete only your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  } 
});

//like or dislike posts
router.put('/likedislike/:id', async (req,res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post.like.includes(req.body.userID)) {
      await post.updateOne( { $push : {like : req.body.userID } });
      await post.updateOne ( { $pull : { dislike : req.body.userID } });
      res.status(200).json("The post has been liked.");
    } else {
      await post.updateOne ( { $push : { dislike : req.body.userID } });
      await post.updateOne ( { $pull : { like : req.body.userID } });
      res.status(200).json("The post has been disliked.");
    }
  }catch (err) {
    res.status(500).json(err);
  }
})

//get a post
router.get('/getpost/:id', async (req,res) => {
  try{
    const post =  await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
})

//get timeline posts

router.get("/timeline/:userID", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userID);
    const userPosts = await Post.find({ userID: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.userFriendList.map((friendId) => {
        return Post.find({ userID: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});  

//get user's posts

router.get('/profile/:firstName', async (req, res) => {
  try{
    const user = await User.findOne({ firstName : req.params.firstName });
    const posts = await Post.find({ userID : user._id });
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;