const mongoose = require('mongoose');
const userdb = require('../../app_api/modules/user');

module.exports.CreateWorkout = function (req,res) {
    userdb.WorkoutSchema.create({
            name: req.body.WName,
            description: req.body.WDescription },
        (err, workout) => {
            if (err){
                res.render('error');
            } else {
                userdb.UserSchema.findByIdAndUpdate(
                    req.params.userId,
                    {$push: {workout: workout}},
                    {new: true},
                    (err, workout) => {
                        if (err) {
                            res.render('error');
                        }
                        else {
                            res.redirect('/user/' +req.params.userId + '/workout/');
                        }
                    });
            }
        });
};



module.exports.ShowAll = function (req,res) {
    userdb.UserSchema.findById(req.params.userId)  //her er der en fejl ved ikke hvad.
        .populate('workout')
        .exec((err, User) => {
            if('error',err ){
                res.render(err);
            }
            else {
                if (User != null) {
                    res.render('workout', {title: 'Workout', workout: userdb.WorkoutSchema.workout, userId: req.params.userId});
                } else {
                    res.render('error', {message: 'User not found'});
                }

            }
        });
};

