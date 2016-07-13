// Mongooose use const Mongooose = models
const mongooose = require('mongooose');
const Schema = mongooose.Schema;


// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// Create the Model Class
const ModelClass = mongooose.model('user', userSchema);

// export the models
module.exports = ModelClass;
