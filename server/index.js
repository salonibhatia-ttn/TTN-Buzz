// 
const dotenv = require("dotenv");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const User = require('./api/db/models/User.js');

// getting the DOTENV file
dotenv.config({path:'./config.env'});

// connecting database using mongoose

const DB = process.env.DATABASE;


mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));

app.use(express.json());
app.use("/post", postRoute);
app.use("/comment", commentRoute);


// assigning port  number
const PORT = process.env.PORT || 3001;


app.get("/", (req,res)=>{
    res.send("hello world");
})


app.post('/signup', async (req,res)=>{


    const newUser = new User({
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    isAdmin : req.body.isAdmin,
    userEmailId : req.body.userEmailId,
    });

    try{
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

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})


app.listen(PORT, console.log(`Server on port ${PORT}`));

