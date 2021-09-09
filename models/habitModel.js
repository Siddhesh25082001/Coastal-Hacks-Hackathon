const mongoose = require('mongoose');

// Habit schema
const schema = new  mongoose.Schema({
    user_id:String,
    habit_name: String,
    habit_type: String,
    habit_freq: Array
});


const Habit = mongoose.model('habits',schema);

module.exports = Habit;