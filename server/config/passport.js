const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../api/db/models/User')
const passport = require('passport')
 
module.exports=function(passport){

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done)=>{
    return done(null, profile);
  }
  ));
  passport.serializeUser((user, done)=>{
     done(null,user.id)
    });
    
    passport.deserializeUser(function(user, done) {

      User.findById(id,(err,user)=>{ 
        console.log(id);
           done(null,user); 
         });
    });
  
}
