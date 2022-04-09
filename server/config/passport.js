const GoogleStrategy = require('passport-google-oauth20').Strategy
// const mongoose = require('mongoose')
// const User = require('../api/db/models/User')
const passport = require('passport')


passport.serializeUser(function(user, done) {
   done(null,user)
  });
  
  passport.deserializeUser(function(user, done) {
        done(null,user);
  });


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

