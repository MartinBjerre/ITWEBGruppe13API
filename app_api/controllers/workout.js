const mongoose = require('mongoose');
const userdb = require('../modules/user');

const _buildWorkout = function(req, res, results) {
    let workout = [];
        results.forEach((doc) => {
            console.log();
            workout.push({
                _id: doc._id,
                WorkoutName: doc.WorkoutName,
                WorkoutDescription: doc.WorkoutDescription,
                workout: doc.exercise
            });
        });
    return workout;
};

module.exports.CreateWorkout = function (req,res) {
    let workouts = [];
    console.log(req.body.WorkoutName);
    userdb.WorkoutSchema.create({
            WorkoutName: req.body.WorkoutName,
            WorkoutDescription: req.body.WorkoutDescription },
        (err, work) => {
            if (err){
                res.render('error');
            } else {
                //console.log(Workout.WorkoutName);
                userdb.UserSchema.findByIdAndUpdate(
                    req.params.userId,
                    {$push: {workout: work}},
                    {new: true},
                    (err, User) => {
                        if (err) {
                            sendJsonResponse(res, 404, 'error');
                        }
                        else {
                            if (User != null) {
                               // workouter = _buildWorkout(req, res, workouts);
                                console.log("test String");
                                console.log(User);
                                sendJsonResponse(res, 200, User);
                            } else {
                                sendJsonResponse(res, 404, 'error');
                            }
                        }
                    });
            }
        });
};

module.exports.ShowAll = function (req,res) {
    let workouts = [];
    userdb.WorkoutSchema.findById(req.params.userId)
        .populate('workout')
        .exec((err, User) => {
            if('error',err ){
                sendJsonResponse(res, 200, 'error');
            }
            else {
                if (User != null) {
                    console.log("testString");
                    //workouts = _buildWorkout(req, res, User.workout);
                    sendJsonResponse(res, 200, User);
                } else {
                    sendJsonResponse(res, 404, 'error');
                }

            }
        });
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}