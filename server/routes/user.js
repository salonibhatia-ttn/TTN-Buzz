const User = require("../api/db/models/User")

const router =  require("express").Router(); 
const bcrypt = require("bcrypt");

// updating user

router.put("/:id", async (req,res)=>{

    
    if(req.body.userId ===req.params.id || req.body.isAdmin ){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("Account has been updated")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can update your account only!!!");
    }
})

// deleting user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete your account only");
    }
  });


  //get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const firstName = req.query.firstName;
    try {
      const user = userId
      ? await User.findById(userId)
      : await User.findOne({firstName : firstName })
      const { password, userFriendList,friendRequest, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get friends
router.get('/friends/:userId', async (req,res) => {
  try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.userFriendList.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, profilePicture } = friend;
      friendList.push({_id, firstName, lastName, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow a user or make friend

  router.put("/:id/makefriend", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.userFriendList.includes(req.body.userId)) {
          await user.updateOne({ $push: { userFriendList: req.body.userId } });
          await currentUser.updateOne({ $push: { userFriendList: req.params.id } });
          res.status(200).json("user is your friend now");
        } else {
          res.status(403).json("you already friend of this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant be friend of yourself");
    }
  });


  //remove or unfriend a user

router.put("/:id/unfriend", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.userFriendList.includes(req.body.userId)) {
          await user.updateOne({ $pull: { userFriendList: req.body.userId } });
          await currentUser.updateOne({ $pull: { userFriendList: req.params.id } });
          res.status(200).json("user has been unfriend");
        } else {
          res.status(403).json("you dont have this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfriend yourself");
    }
  });


module.exports = router;