// models/Image.js
// require the mongoose package from the connection pool
const mongoose = require('../db/connection');

// make a new schema with 2 properties, and assign it to a variable
const ImageSchema = new mongoose.Schema({
	path: String,
	description: String,
});

// instantiate the model, calling it "Image" and with the schema we just made
const Image = mongoose.model('Image', ImageSchema);

// export the newly created model
module.exports = Image;