/**
 * Created by juliaortheden on 2017-05-30.
 */
var express = require('express');
var router = express.Router();

var Route = require('../models/route');

//driverview
router.get('/driverview', function (req, res){
    res.render('driverview');
});

//register new route
router.post('/driverview', function (req, res){
    var way = req.body.way;
    var time = req.body.time;
    var recess = req.body.recess;
    var cost = req.body.cost;
    var ob = req.body.ob;

    //validation
    req.checkBody('way', 'Way is required').notEmpty();
    req.checkBody('time', 'Time is required').notEmpty();
    req.checkBody('recess', 'Recess is not valid').isEmail();
    req.checkBody('cost', 'Cost is required').notEmpty();
    req.checkBody('ob', 'Ob is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('%',{
            errors: errors
        });
    }else {
        var newRoute = new Route({
            way: way,
            time: email,
            recess: username,
            cost: password,
            ob: ob,
        });

        User.createRoute(newRoute, function(err, route) {
            if(err) throw err;
            console.log(route);
        });

        req.flash('success_msg', 'Your route was added');
    }
});

module.exports = router;