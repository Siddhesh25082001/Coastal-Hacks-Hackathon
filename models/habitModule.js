// This is 'habitModule.js' of Coastal Hacks Hackathon

// Importing Mongoose Module
const mongoose = require('mongoose');

// Habit Schema
const schema = new mongoose.Schema({
    user_id:String,
    habit_name: String,
    habit_type: String,
    habit_commitment:Number,
    habit_freq: Array,
    completed_count:Number,
    last_date:Date,


});

// Creating an object of the Habits Module
const Habit = mongoose.model('habits',schema);

// Exporting the Habit Object
module.exports = Habit;