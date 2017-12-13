const mongoose = require('mongoose');
const User = mongoose.model('user');


module.exports.CreateUser = function (req,res) {
    User.create({
            name: req.body.UserName},
        (err, user) => {
            if (err){
                res.render('error');
            } else {
                User.find({},
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
    User.find({})
        .exec((err, user) => {
            if(err){
                res.render('error');
            }
            else {
                res.render('user', {title: 'user', user: user});
            }
        });
};
