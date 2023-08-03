// Import the mongoose library
const mongoose = require('mongoose');

// Extract the 'Schema' class from mongoose
const { Schema } = mongoose;

// Define the schema for the "user" collection
const userSchema = new Schema({
    name: { type: String, required: true },           // Specifies a required string field for the user's name
    email: { type: String, required: true, unique: true },   // Specifies a required string field for the user's email, and enforces uniqueness
    password: { type: String, required: true },       // Specifies a required string field for the user's password
    date: { type: Date, default: Date.now },          // Specifies a date field for the user's registration date with a default value of the current date
});

// Create and export a Mongoose model for the "user" collection using the defined schema
module.exports = mongoose.model('user', userSchema);
