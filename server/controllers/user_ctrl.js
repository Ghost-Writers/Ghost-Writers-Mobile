var User = require('../models/user.js');

module.exports = {

  loginUser: function(req,res) {
        User
      .findOne({tagname: req.body.username, password: req.body.password})
      .exec(function(err, user) {
        if (err) return console.log(err)
        res.json({user})
      })
  },

  index: function(req, res) {
    User
      .find({})
 
      .exec( function(err, users) {
        if (err) return console.log(err)
        res.json({ success: true, message: 'all users', users: users })
      })
  },
  show_test: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user) {
        if (err) return console.log(err)

      })
  },
  create: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (!user) return res.json({success: false, message: 'user already exists'})
      if (err) return console.log(err)
      res.json({success: true, message: 'user created', user: user});
    })
  },
  show: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        res.json({success: true, message: 'user found', user: user});
      })
  },
  show_email: function(req, res) {
    User
      .findOne({email: req.params.email})
      .exec(function(err, user) {
        if (err) return console.log(err)
        res.json({success: true, message: 'user found', user: user});
      })
  },
  update_user: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user){
        if (err) return console.log(err)
        if (req.body.email) {
          user.email = req.body.email;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.tagname) {
          user.tagname = req.body.tagname;
        }
        if (req.body.phone_number) {
          user.phone_number = req.body.phone_number;
        }
        user.save(function(err, user) {
          if (err) return console.log(err)
          res.json({success: true, message: 'user info updated', user: user})
        })
      })
  },
  delete_user: function(req, res) {
    User
      .findOneAndRemove({_id: req.params.id}, function(err) {
        if (err) return console.log(err)
        res.json({success: true, message: 'user successfully deleted'})
      })
  }
}