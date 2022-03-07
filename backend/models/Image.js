const mongoose = require('../db/connection');

// make a new schema with 2 properties, and assign it to a variable
const ImageSchema = new mongoose.Schema({
	path: String,
	description: String,
});

// instantiate the model, calling it "Image" and with the schema we just made
const ClientImage = mongoose.model('clientImages', ImageSchema);
const SalonImage = mongoose.model('salonImages', ImageSchema)

// export the newly created model
module.exports = ClientImage, SalonImage;