const mongoose = require('mongoose');
const userdb = require('../modules/user');

const _buildUser = function(req, res, results) {
    let user = [];
    results.forEach((doc) => {
        user.push({
            _id: doc._id,
            UserName: doc.name,
            workout: doc.workout
        });
    });
    return user;
};

module.exports.CreateUser = function (req,res) {
    let users = [];
    userdb.UserSchema.create({
            name: req.body.UserName,
            workout: req.body.workout},
        (err, user) => {
            if (err){
                res.render('error');
            } else {
                userdb.UserSchema.find({},
                    (err, user) => {
                        if (err) {
                            sendJsonResponse(res, 404 ,{"error": "user not found"});
                        }
                        else {
                            //users = _buildUser(req, res, user);
                            sendJsonResponse(res, 200 , user);
                        }
                    });
            }
        });
};

module.exports.ShowAllUser = function (req,res) {
    userdb.UserSchema.find({})
        .exec((err, user) => {
            if(err){
                sendJsonResponse(res, 404 ,{"error": "user not found"});
            }
            else {
                //users = _buildUser(req, res, user);
                sendJsonResponse(res, 200 ,user);
            }
        });
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}