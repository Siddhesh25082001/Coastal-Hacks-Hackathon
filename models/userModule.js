// This is 'userModule.js' of Coastal Hacks Hackathon

// Importing Mongoose Module
const mongoose = require('mongoose');

// User Schema
const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bed_time: String
});

// Creating an object of the Users Module
const User = mongoose.model('users', schema);

// Exporting the User Object
module.exports = User;