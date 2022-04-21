// 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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
const session = require('express-session')


// getting the DOTENV file
dotenv.config({path:'./config.env'});

// connecting database using mongoose
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));

// passport
require("./config/passport")(passport);


// using middleware

app.use(cors());
app.use((req,res, next) => {
 res.header("Access-Control-Allow-Origin" , "*");
 res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, HEAD, OPTIONS"
 );
 res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, visitorid, language"
 );
 res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
 res.header("Access-Control-Allow-Credentials", true);

 next();
});

app.use(express.json());
app.use(bodyParser.urlencoded( {extended : false} ));
app.use(bodyParser.json());

// cookie Session
app.use(cookieSession({
    name: 'ttnbuzz',
    keys: ["key1","key2"]

  }))


//   Sessions
app.use(session({
    secret:'keyboard car',
    resave: false,
    saveUninitialized: false,
})
)


 // passport middleware
app.use(passport.initialize())
app.use(passport.session())   

// calling routes   
app.use("/post", postRoute);      
app.use("/comment", commentRoute);
app.use("/user",userRoute);
app.use('/image', imageRoute);
app.use("/",indexRoute)
app.use("/",authRoute);


// assigning port  number
const PORT = process.env.PORT || 3001;

//using jsonwebtoken

const createToken = async()=>{
   const token= await jwt.sign({_id:"62611b0f334af1c19818b1a7"},"mynameissandeepbhattiamworkingintothenewandmakingnewproject",{expiresIn:"24 hours"})
   console.log(token);
   
   const userVer = await jwt.verify(token,"mynameissandeepbhattiamworkingintothenewandmakingnewproject");
   console.log(userVer);

}

createToken();

app.listen(PORT, console.log(`Server on port ${PORT}`));

    