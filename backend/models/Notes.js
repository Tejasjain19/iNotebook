const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,     // like foreign key in mysql
        ref: 'user'                               // reference model 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('notes', notesSchema);