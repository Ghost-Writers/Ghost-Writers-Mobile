var Art = require('../models/art.js');
var User = require('../models/user.js');

module.exports = {
  show: function (req, res) {
    Art
      .findOne({
        _id: req.params.id
      }) // from find_view on front end mobile after image recognition 
      .exec(function (err, art) {
        if (err) return console.log(err)
        res.json({
          success: true,
          message: 'post found',
          art: art
        });
      })
  },
  index: function (req, res) {
    var searchBy = {};
    
    if (req.params.city) {
      searchBy['city'] = req.params.city
    }
    Art
      .find(searchBy)
      .exec(function (err, art) {
        if (err) return console.log(err)
        res.json({
          success: true,
          message: 'all art',
          art: art
        });
      })
  },
  create: function (req, res) {
    console.log('create invoked from backend ctrl, req.params = ', req.params)
    User
      .findOne({
        _id: req.params.id
      }) // from session/jwt-token/local-storage - refers to current user.
      .exec(function (err, user) {
        console.log('user from ctrl2 = ', user);
        if (err) return console.log(err)
        var new_art = new Art(req.body); // form data from create page with events, city, title, etc.
        new_art.created_by_id = user._id;
        new_art.save(function (err, art) {
          if (err) return console.log(err)
          user.created_art.push(art);
          user.save(function (err, user) {
            if (err) return console.log(err)
            res.json({
              success: true,
              messge: 'art created',
              art: art
            })
          })
        })
      })
  },
  // all plans user created but not done
  index_user: function (req, res) {
    User
      .findOne({
        _id: req.params.id
      }) // from session/jwt-token/local-storage - refers to current user.
      .exec(function (err, user) {
        if (err) return console.log(err)
        console.log(user._id, '>>> user instance')
        Plan
          .find({
            created_by_id: user._id
          }) // finds all plans that the signed in user has created
          .exec(function (err, plans) {
            if (err) return console.log(err)
            res.json({
              success: true,
              message: 'all plans created by user',
              plans: plans
            });
          })
      })
  },
  // all art user have found
  index_found: function (req, res) {

  },

  update_art_info: function (req, res) {
    // TODO: mvp + optimization when editing
    Art
      .findOne({
        _id: req.params.id
      })
      .exec(function (err, art) {
        if (err) return console.log(err)
        if (req.body.title) {
          art.title = req.body.title;
        }
        if (req.body.city) {
          art.city = req.body.city;
        }
        if (req.body.longitude) {
          plan.longitude = req.body.longitude;
        }
        if (req.body.latitude) {
          plan.latitude = req.body.latitude;
        }
        if (req.body.altitude) {
          plan.altitude = req.body.altitude;
        }
        
        art.save(function (err, art) {
          if (err) return console.log(err)
          res.json({
            success: true,
            message: 'art info updated',
            art: art
          })
        })
      })
  },
  delete_art: function (req, res) {
    User
      .findOne({
        _id: req.params.id
      }) // from session/jwt-token/local-storage - refers to current user.
      .exec(function (err, user) {
        if (err) return console.log(err)
        user.created_arts.pull({
          _id: req.body.art_id
        }) // removes art from user's array of arts
        user.save(function (err, user) {
          if (err) return console.log(err)
          Art
            .findOneAndRemove({
              _id: req.body.art_id
            }, function (err) { // deletes art instance... mongodb is no-realational so if we just deleted the art, it would still exist in the user's array of arts.
              if (err) return console.log(err)
              res.json({
                success: true,
                message: 'art successfully deleted'
              });
            })
        })
      })
  },
  mark_art_found: function(req, res) {
    User
      .findOne({_id: req.body.user_id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        Art
          .findOne({_id: req.params.id})
          .exec(function(err, art) {
            if (err) return console.log(err)
           
            if (art.found.indexOf(user._id) === -1) {
              art.found.push(user._id);
            }
            art
              .save(function(err, art) {
                if (err) return console.log(err)
                if (user.found_art.indexOf(user._id) === -1) {
                  user.found_art.push(art._id);
                }
                user
                  .save(function(err, user) {
                    if (err) return console.log(err)
                    res.json({success: true, message: 'art has been marked as found', art: art, user: user})
                  })
              })
          })
      })
  },

}