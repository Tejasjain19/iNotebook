// Import the mongoose library
const mongoose = require('mongoose');

// Extract the 'Schema' class from mongoose
const { Schema } = mongoose;

// Define the schema for the "notes" collection
const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,   // Represents a reference to another document's ObjectId
        ref: 'user'                             // References the "user" model/collection
    },
    title: { type: String, required: true },    // Specifies a required string field for the note's title
    description: { type: String, required: true },  // Specifies a required string field for the note's description
    tag: { type: String, required: true },       // Specifies a required string field for the note's tag
    date: { type: Date, default: Date.now },     // Specifies a date field for the note's date with a default value of the current date
});

// Create and export a Mongoose model for the "notes" collection using the defined schema
module.exports = mongoose.model('notes', notesSchema);
