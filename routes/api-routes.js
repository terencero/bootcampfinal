var path = require('path');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models/user');
var Employer = require('../models/employer')
var Freelancer = require('../models/freelancer');
var User = db.User;

module.exports = function (app) {

    // Login route
    app.post('/login', passport.authenticate('local'), function (req, res) {
        if (req.user){
            res.json(req.user);
        }
    });

    // Register route
    app.post('/register', function (req, res) {

        db.findOne({username:req.body.username}, function(err, dbRes){

            if (err) { console.log(err); }
            if (!dbRes) {

                db.register(new db({ username : req.body.username }), req.body.password, function(err, user) {
                    if (err) { console.log(err); }

                    passport.authenticate('local')(req, res, function () {
                        res.json(req.user);
                    });
                });
            }
            else {
                passport.authenticate('local')(req, res, function () {
                        res.json(req.user);
                });
            }
        });
    });

    // signup routes
    app.post('/employer', function (req, res) {
        // create a new employer profile and pass the req.body to the entry
        var newEmployer = new Employer(req.body);

        // save the new employer in the employers collection
        newEmployer.save(function(err, doc) {
            if (err) {
                res.send(err);
            } else {
                // Find one user in our user collection
                // then update it by pushing the object id of the employer 
                db.findOneAndUpdate({ '_id': req.params.id }, { $push: { 'employer': doc._id } }, { new: true }, function(error, doc) {
                    // log any errors
                    if (err) {
                        console.log(err);
                    } else {
                        // or send the doc to the browser
                        res.json(doc);
                    }
                });
                
            }

        }); 
    });
}