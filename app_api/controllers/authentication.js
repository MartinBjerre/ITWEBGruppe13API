var passport = require('passport');
var mongoose = require('mongoose');
var userdb = require('../modules/user');


var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  if (!req.body.name || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  var user = new userdb.UserSchema();

  user.name = req.body.name;
  console.log(req.body.password);
  user.setPassword(req.body.password);
  user.workout = [];
  //her er der en fejl poul..
  user.save(function (err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    }
  });

};

module.exports.login = function (req, res) {
  if (!req.body.name || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  passport.authenticate('local', function (err, user, info) {
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      console.log(user);
      sendJSONresponse(res, 200, {
        "token": token
      });
    } else {
      console.log(info);
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};
