// 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// routes
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const userRoute =require("./routes/user");
// dotenv file
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// models
const User = require('./api/db/models/User.js');


// getting the DOTENV file
dotenv.config({path:'./config.env'});

// connecting database using mongoose
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));




// using middleware
app.use(express.json());

// calling routes
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/user",userRoute);


// assigning port  number
const PORT = process.env.PORT || 3001;

// home page
app.get("/", (req,res)=>{
    res.send("hello world");
})


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

