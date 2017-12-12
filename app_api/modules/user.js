const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var ExerciseSH = Schema({
    ExerciseName: {
        type: String
    },
    ExerciseDescription: {
        type: String
    },
    ExerciseSets: {
        type: Number
    },
    ExerciseRepstime: {
        type: Number
    }
});
const exerciseSH = mongoose.model('exerciseSH',ExerciseSH);

var WorkoutSH = Schema({
    WorkoutName: {
        type: String
    },
    WorkoutDescription:{
        type: String
    },
    exercise: {
        type: [ExerciseSH]
    }
});
const workoutSH = mongoose.model('workoutSH',WorkoutSH);

var UserSH = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    workout: {
        type: [WorkoutSH]
    },
    hash: String,
    salt: String
});
var userSH = mongoose.model('userSH', UserSH);

UserSH.methods.setPassword = function (password) {
    console.log("password");
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('hex');
};

UserSH.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('hex');
  return this.hash === hash;
};


UserSH.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = {
    UserSchema: userSH,
    WorkoutSchema: workoutSH,
    ExercsieSchema: exerciseSH
};