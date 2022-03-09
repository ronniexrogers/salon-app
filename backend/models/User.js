const mongoose = require('../db/connection');

// make a new schema with 2 properties, and assign it to a variable
const UserSchema = new mongoose.Schema({
	firstName: String,
    lastName: String,
    googleId: String,
    email: String,
    profilePicturePath: String,
    role: String
});

// instantiate the model, calling it "Image" and with the schema we just made
const User = mongoose.model('users', UserSchema)


// export the newly created model
module.exports = User