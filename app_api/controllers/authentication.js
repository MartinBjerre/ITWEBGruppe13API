var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('user');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  console.log(req.body.name);
  if (!req.body.name || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  console.log(req.body.name);
  var user = new User();
  user.name = req.body.name;
  console.log(req.body.name);
  user.setPassword(req.body.password);
  console.log(req.body.name);
  user.save(function (err) {
    console.log(req.body.name);
    var token;
    if (err) {
      console.log(req.body.name);
      sendJSONresponse(res, 404, err);
    } else {
        console.log(req.body.name);
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
