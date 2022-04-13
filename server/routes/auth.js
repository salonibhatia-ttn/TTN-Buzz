const express = require ('express')
// const passport = require('../config/passport')
const router = express.Router()
const passport=require('passport');


// auth with google
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));


  // //   google auth callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/welcome');
  });

module.exports= router