const mongoose = require('mongoose');
const userdb = require('../../app_api/modules/user');

module.exports.CreateUser = function (req,res) {
    userdb.UserSchema.create({
            name: req.body.UserName},
        (err, user) => {
            if (err){
                res.render('error');
            } else {
                userdb.UserSchema.find({},
                    (err, user) => {
                        if (err) {
                            res.render('error');
                        }
                        else {
                            res.redirect('/');
                            //res.render('user', {title: 'user', user: user});
                        }
                    });
            }
        });
};

module.exports.ShowAllUser = function (req,res) {
    userdb.UserSchema.find({})
        .exec((err, user) => {
            if(err){
                res.render('error');
            }
            else {
                res.render('user', {title: 'user', user: user});
            }
        });
};
