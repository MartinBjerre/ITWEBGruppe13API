const mongoose = require('mongoose');
var userdb = require('../modules/user');

const _buildExercise = function(req, res, results) {
    let exercise = [];
        results.forEach((doc) => {
            exercise.push({
                _id: doc._id,
                ExerciseName: doc.ExerciseName,
                ExerciseDescription: doc.ExerciseDescription,
                ExerciseSets: doc.ExerciseSets,
                ExerciseRepstime: doc.ExerciseRepstime
            });
        });
    return exercise;
};

module.exports.CreateExercise = function(req, res) {
    userdb.ExercsieSchema.create(
        {
            ExerciseName: req.body.ExerciseName,
            ExerciseDescription: req.body.ExerciseDescription,
            ExerciseSets: req.body.ExerciseSets,
            ExerciseRepstime: req.body.ExerciseRepstime
        },
        (err, exer) => {
            userdb.WorkoutSchema.findByIdAndUpdate(
                req.params.workoutId,
                {$push: {exercise: exer}},
                {new: true},
                (err, Workout) => {
                    if (err) {
                        //res.render('error');
                        sendJsonResponse(res,404,{"error" :"Exercise not found"});
                    }
                    else {
                        if (Workout != null) {
                            sendJsonResponse(res, 200, Workout.exercise);
                        }
                        else {
                            sendJsonResponse(res, 404, {"error": "Exercise not found"});
                        }
                    }
                });
        });
};

module.exports.GetByWorkoutId = function(req, res) {
    userdb.WorkoutSchema.findById(req.params.workoutId)
        .populate('exercise')
        .exec((err, Workout)=> {
            if (err){
                sendJsonResponse(res,404,{"error" :"Exercise not found"});
            } else {
                if (Workout != null) {
                    //Exercises = _buildExercise(req, res, Workout.exercise);
                    sendJsonResponse(res, 200, Workout.exercise);
                }
                else {
                    sendJsonResponse(res, 404, {"error": "Exercise not found"});
                }
            }
        });
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}