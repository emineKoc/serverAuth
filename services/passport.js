const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email'}
const localLogin = new LocalStrategy( localOptions , function( email, password, done ){

  // Verify this user name and passport , call fone if it is correct,
  // if email and password wrong , Call done with false.
  User.findOne({email:email}, function(err,user){
    if(err){return done(err)}
    if(!user) {return done(null,false)}

    // compare passwords, is password equal to user.password?
    user.comparePassword(password, function(err,isMatch){
      if(err){return done(err)};
      if(!isMatch) {return done(null,false)};

      return done(null, user);
    })


  })

})

// Note: We will verify the user with jwt
// Other option would be verify by email and pass

// Set up a JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create jwt strategy
// payload is decoded auth subject
const jwtLogin = new JwtStrategy( jwtOptions, function( payload, done ){
  // See if the userid in the payload exist in the Database,
  // if it does call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err,user){
    if(err){return done(err,false)}

    if(user){
      done(null,user)
    } else {
      done(null,false);
    };

  })

});

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
