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
const indexRoute= require('./routes/index')
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



 // passport middleware
app.use(passport.initialize())
app.use(passport.session())   

// calling routes   
app.use("/post", postRoute);      
app.use("/comment", commentRoute);
app.use("/user",userRoute);
app.use("/",authRoute);
app.use('/image', imageRoute);
app.use("/",indexRoute)


// assigning port  number
const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server on port ${PORT}`));

