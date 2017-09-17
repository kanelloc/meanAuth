const express   =   require('express');
const router    =   express.Router();
const passport  =   require('passport');
const jwt       =   require('jsonwebtoken');
var bcrypt       =   require('bcryptjs');

// Models
const User  =   require('../models/user')

/**
 * Register (POST)
 */
router.post('/register', (req, res, next) => {
    var email       = req.body.email;
    var username    = req.body.username;
    var password    = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash_password = bcrypt.hashSync(password, salt);

    var newUser =   new User({
        username: username,
        email: email,
        password: hash_password
    });

    newUser.save(function(err) {
        if (err) {
            if (err.name == 'MongoError')
            res.json({success: false, msg:'Email already exists'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

/**
 * Login (POST)
 */
router.post('/authenticate', (req, res, next) => {
    const email     =   req.body.email;
    const username  =   req.body.username;
    const password  =   req.body.password;

    User.findOne({email : email}, function(err, user) {
      if (err) throw err;
      if (!user) {
        return res.json({success: false, msg: 'User not found'});
      }
      User.comparePassword(password, user.password, function(err, isMatch)  {
        if (err) throw err;
        if (isMatch) {
            var token = jwt.sign({user}, 'secret', {
                expiresIn: 604800
            });

            res.json({
                success: true, 
                token:'JWT '+token,
                msg:'You are now loged in',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } else{
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
});

/**
 * Profile Page (GET)
 */
router.get("/profile", passport.authenticate('jwt', { session: false }), function(req, res, next){
  res.json({user: req.user});
});


module.exports  =   router;