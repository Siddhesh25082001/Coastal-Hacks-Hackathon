// This is 'app.js' file of Coastal Hacks Hackathon

// Importing Required Modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const userRouter = require('./routes/user');

// Initialize passport.js Function
require('./config/passport')(passport);   

// Initializing app on a particular port no
const port = 3000;
const app = express();

// Setting the view engine
app.set('view engine', 'ejs');

// Setting the ejs view path
app.set('views', path.join(__dirname, '/views'));

// Setting static files path 
app.use(express.static(path.join(__dirname, '/static')));

// Connecting to MongoDB Database
const conn_string = 'mongodb://merlin_201:passpass@trial-shard-00-00.kon8a.mongodb.net:27017,trial-shard-00-01.kon8a.mongodb.net:27017,trial-shard-00-02.kon8a.mongodb.net:27017/coastalhacks?ssl=true&replicaSet=atlas-zy8kof-shard-0&authSource=admin&retryWrites=true&w=majority';

// Handling the try catch MongoDB Atlas connection
mongoose.connect(conn_string, { useNewUrlParser:true, useUnifiedTopology:true})
    .then( () => console.log("Connected to Atlas Database Successfully"))
    .catch( (err) => console.log("Error : ", err));

// Body Parser Middleware
app.use(express.urlencoded({ extended:false }));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use Connect Flash
app.use(flash());

// Global variables - Store success and error messages 
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// -------------------------------------------------------- ROUTING ------------------------------------------------------

// Home Page
app.get('/', (req,res) => {
    res.render('index');
});

// All User Endpoints are handled here
app.use('/user', userRouter);

// Testing the App
app.listen(process.env.PORT || port, (req,res) => {
    console.log(`Listening on port ${port}`);
});