const express = require ('express')

const router = express.Router()


//  middleware
const isLoggedIn =(req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }

} 

// home page
router.get("/", (req,res)=>{
    res.send("hello world nodejs");
})

router.get("/failed", (req,res)=>{
    res.send("unable to login !!");   
})


router.get("/welcome",isLoggedIn, (req,res)=>{
    res.send(`welcome user ${req.user.displayName}`);
})


router.get('/logout',(req,res)=>{
    req.session= null;
    req.logout();
    res.redirect("/");
})

router.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });


// Register user

router.post('/register', async (req,res)=>{
   try{

        // generating new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

 //   crating new user
      const newUser = new User({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        isAdmin : req.body.isAdmin,
        userEmailId : req.body.userEmailId,
        password:hashedPassword,
        });

    //    save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

})

router.post('/login',async(req,res)=>{
    try{
        const user =  await User.findOne({userEmailId:req.body.userEmailId});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("invalid/wrong password")



        // 

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports= router