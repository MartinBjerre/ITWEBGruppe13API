const mongoose = require('mongoose');
const User = mongoose.model('user');
const Workout = mongoose.model('workout');

module.exports.CreateWorkout = function (req,res) {
    Workout.create({
            name: req.body.WName,
            description: req.body.WDescription },
        (err, workout) => {
            if (err){
                res.render('error');
            } else {
                User.findByIdAndUpdate(
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
    User.findById(req.params.userId)  //her er der en fejl ved ikke hvad.
        .populate('workout')
        .exec((err, User) => {
            if('error',err ){
                res.render(err);
            }
            else {
                if (User != null) {
                    res.render('workout', {title: 'Workout', workout: User.workout, userId: req.params.userId});
                } else {
                    res.render('error', {message: 'User not found'});
                }

            }
        });
};


module.exports.remove= function(req, res){
    Workout.findByIdAndRemove(
        req.params.id,
        (err, workout) => {
            res.redirect('workout');
        });
};
