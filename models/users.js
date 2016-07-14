// Mongooose use const Mongooose = models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On Save Hook, Encript Password
userSchema.pre('save', function(next){
  // access the user model
  const user = this;

  // generate a salt, and then run the callback
  bcrypt.genSalt(10, function(err, salt){
    if(err) { return  next(err) }
    // hash (encrypt) ourpassword using the salt
    bcrypt.hash(user.password, salt, null, function(err,hash){
      if(err) { return  next(err) }
      // overwrite plain text to hash
      user.password = hash;
      next(); // go and save the password
    })

  })
})


// Helper
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch ){
    if(err) { return  callback(err) }
    callback(null, isMatch)
  })
};



// Create the Model Class
const ModelClass = mongoose.model('user', userSchema);

// export the models
module.exports = ModelClass;
