const jwt = require('jwt-simple')
const User = require('../models/users')
const config = require('../config')

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id,  iat:timestamp }, config.secret); // sub stands for subject, as a convention'  iat is for issued at time
}

exports.signup = function(req,res,next){
  const email = req.body.email;
  const password = req.body.password;

  // if email is not provided;
  if(!email || !password){
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  // See if a user with given email exists
    User.findOne({ email: email }, function( err, existinUser){
      if(err) { return next(err); }

  // If a user exist, return an Error
  if(existinUser) {
      return res.status(422).send({error: 'You already have an account, Please sign in'  })}


  // If a user with email does not exist,
  // create and save user record
    const user = new User({
      email:email,
      password:password
    })

    // Respond to request indicating the user was created
    user.save( function(err){
      if (err) { return next(err)}

      res.json({ token: tokenForUser(user)  })

    })

  });
}

exports.signin = function(req,res,next){
  // User has already has their email and password auth,
  // We need to give them a token
  res.send({token:tokenForUser(req.user)})

}
