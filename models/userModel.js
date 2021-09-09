const mongoose = require('mongoose');

// User schema
const schema = new  mongoose.Schema({
    name: String,
    email:String,
    password:String,
    bed_time:String
});


const User = mongoose.model('users',schema);

module.exports = User;