  
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'email',
      passwordField: 'password' 
  },
    function(userEmailId, password, done) {  
      console.log(email, password);
      User.findOne({
        email: userEmailId
      }, function(err, user) {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      });
    }
  ));