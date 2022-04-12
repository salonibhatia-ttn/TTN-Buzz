// 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// routes  
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const userRoute =require("./routes/user");
const authRoute= require("./routes/auth");
const imageRoute = require('./routes/image');
// dotenv file
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// models
const User = require('./api/db/models/User.js');
// passport
const passport = require('passport')
const cookieSession = require('cookie-session')


// getting the DOTENV file
dotenv.config({path:'./config.env'});

// connecting database using mongoose
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));

// passport
require("./config/passport");


// using middleware
app.use(express.json());
app.use(bodyParser.urlencoded( {extended : false} ));
app.use(bodyParser.json());

// cookie Session
app.use(cookieSession({
    name: 'ttnbuzz',
    keys: ["key1","key2"]

  }))

//  middleware
 const isLoggedIn =(req,res,next)=>{
     if(req.user){
         next();
     }else{
         res.sendStatus(401);
     }

 } 

 // passport middleware
app.use(passport.initialize())
app.use(passport.session())   

// calling routes   
app.use("/post", postRoute);      
app.use("/comment", commentRoute);
app.use("/user",userRoute);
app.use("/",authRoute);
app.use('/image', imageRoute);


// assigning port  number
const PORT = process.env.PORT || 3001;

// home page
app.get("/", (req,res)=>{
    res.send("hello world nodejs");
})

app.get("/failed", (req,res)=>{
    res.send("unable to login !!");   
})


app.get("/welcome",isLoggedIn, (req,res)=>{
    res.send(`welcome user ${req.user.displayName}`);
})


app.get('/logout',(req,res)=>{
    req.session= null;
    req.logout();
    res.redirect("/");
})



// passport auth google
// app.get('/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));

// app.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/welcome');
//   });



app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });


// Register user

app.post('/register', async (req,res)=>{
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

app.post('/login',async(req,res)=>{
    try{
        const user =  await User.findOne({userEmailId:req.body.userEmailId});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("invalid/wrong password")

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})


app.listen(PORT, console.log(`Server on port ${PORT}`));

