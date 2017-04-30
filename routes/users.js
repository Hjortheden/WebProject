var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//register
router.get('/register', function (req, res){
    res.render('register');
});

//driverview
router.get('/%', function (req, res){
    res.render('driverview');
});

//login
router.get('/login', function (req, res){
    res.render('login');
});

//register
router.post('/register', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords does not match').equals(req.body.password);


    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors: errors
        });
    }else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user) {
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now log in');

        res.redirect('/users/login');
    }
});
/*
router.post('/%', function (req, res){
    var way = req.body.way;
    var time = req.body.time;
    var recess = req.body.recess;
    var cost = req.body.cost;
    var ob = req.body.ob;

    //validation
    req.checkBody('way', 'Name is required').notEmpty();
    req.checkBody('time', 'Email is required').notEmpty();
    req.checkBody('recess', 'Email is not valid').isEmail();
    req.checkBody('cost', 'Username is required').notEmpty();
    req.checkBody('ob', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors: errors
        });
    }else {
        var newTrip = new Trip({
            way: way,
            time: email,
            recess: username,
            cost: password,
            ob: ob,
        });

        User.createTrip(newTrip, function(err, trip) {
            if(err) throw err;
            console.log(trip);
        });

        req.flash('success_msg', 'You are registered and can now log in');

        res.redirect('/users/login');
    }
});

*/


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect:'/users/login', failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});
module.exports = router;