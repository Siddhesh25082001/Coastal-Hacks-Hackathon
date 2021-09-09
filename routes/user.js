// This is 'user.js' file of Coastal Hacks Hackathon

// Importing Required Modules
const express = require('express');
const User = require('../models/userModule');
const passport = require('passport');
const { isAuth } = require('../config/auth');
const bcrypt = require('bcrypt');
const Habit = require('../models/habitModule');

// Initialize the router
const router = express.Router();

// Dashboard Page
router.get('/dashboard', isAuth,  (req, res) => {

    // Checking If the User has Habits
    Habit.find({ user_id: req.user._id}, (err, result) => {
        
        // Passing False If the User does not have any Habits
        if (err){
            res.render('dashboard', {
                'user': req.user,
                'allHabits': false
            });
        }
        else{

            // Passing the Result if Habits exists
            res.render('dashboard', {
                'user': req.user,
                'allHabits': result
            });
        }
    });
});

// New User Registration
router.post('/register', (req, res) => {
    
    const { name, email } = req.body;
    
    // Initially setting the bedtime to zero
    const bed_time = 0 ;
    var password = req.body.password;
    
    if (password.length < 6) {
        req.flash('error', 'Password Length should be greater than 5 !!');
        return res.redirect('/');
    }
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                req.flash('error', 'User with this email already exists !!');
                res.redirect('/');
            }
            else {   
                const saltRounds = 10;  // Higher the salt value, more time for hashing

                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                         if(err) throw err;
                         else{
                            password = hash;
                            const newRecord = new User({
                                name,
                                email,
                                password,
                                bed_time
                            });
                            newRecord.save();
                            req.flash("success","Registration Successfull, Login with your Email and Password !!");
                            res.redirect("/user/login");
                         }
                    });
                });  
            }
        });
});

// User Login

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', (req, res, next) => {
    passport.authenticate('userLogin', {
        successRedirect: '/user/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true,
        successFlash: 'Logged in Successfully'
    })(req, res, next);
});

// User Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success','You Logged Out Successfully')
    res.redirect('/');
});

// Adding the BedTime
router.post('/addBedtime', (req,res) => {
    const bed_time = req.body.time;

    let update = User.updateOne( { "_id": req.user._id},
    {
        "$set":{
            "bed_time":bed_time
        }
    }, (err,result) => {
        if(err) throw err;
    });

    req.flash("success", "Your BedTime was Updated");
    res.redirect('/user/dashboard');
});

// Add Habits 
router.post('/addHabit', (req,res) => {
    const {hname, htype, mon, tue, wed, thu, fri, sat, sun,hcommitment} = req.body;
    const user_id = req.user._id;
    let freq_arr = [0,0,0,0,0,0,0];        // Frequency Array -> [mon, tue, wed, thu, fri, sat, sun]
    var completed_count = 0;               // Set Habit completed count to zero initially

    // Setting last_date to yesterdays date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.toDateString();

    // Habit Frequency Array Populating
    if(mon != undefined) freq_arr[0] = 1;
    if(tue != undefined) freq_arr[1] = 1;
    if(wed != undefined) freq_arr[2] = 1;
    if(thu != undefined) freq_arr[3] = 1;
    if(fri != undefined) freq_arr[4] = 1;
    if(sat != undefined) freq_arr[5] = 1;
    if(sun != undefined) freq_arr[6] = 1;

    const newHabit = new Habit ({
        user_id:user_id,
        habit_name:hname,
        habit_type:htype,
        habit_freq:freq_arr,
        habit_commitment:hcommitment,
        completed_count:completed_count,
        last_date:yesterday
    });
    newHabit.save();

    req.flash('success', 'New Habit Added');
    res.redirect('/user/dashboard');
    
});

// When user clicks mark completed button
router.post('/habitCompleted',async (req,res) => {
    var habit_id = req.query.habit_id;
    const date = new Date();
    let data = await Habit.findOneAndUpdate({_id :habit_id}, {$inc : {'completed_count' : 1},$set:{'last_date':date}});
    res.redirect('/user/dashboard');
      
});


// Exporting Routes Module
module.exports = router;