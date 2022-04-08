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
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, userFriendList,friendRequest, ...other } = user._doc;
      res.status(200).json(other);
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

module.exports = router;