const express   =   require('express');
const router    =   express.Router();
const passport  =   require('passport');
const jwt       =   require('jsonwebtoken');
var bcrypt       =   require('bcryptjs');
var config = require('../../config/config');

ExtractJwt = require('passport-jwt').ExtractJwt;

// Models
const Admin  =   require('../../models/admin');
const User  =   require('../../models/user');

/**
 * Login (POST)
 */
router.post('/authenticate', (req, res, next) => {
    const email     =   req.body.email;
    const username  =   req.body.username;
    const password  =   req.body.password;

    Admin.findOne({email : email}, function(err, admin) {
      if (err) throw err;
      if (!admin) {
        return res.json({success: false, msg: 'Admin not found'});
      }
      Admin.comparePassword(password, admin.password, function(err, isMatch)  {
        if (err) throw err;
        if (isMatch) {
            var token = jwt.sign({admin}, config.secret, {
                expiresIn: 604800
            });

            res.json({
                success: true, 
                token:token,
                msg:'You are now loged in',
                admin: {
                    id: admin._id,
                    username: admin.username,
                    email: admin.email
                }
            });
        } else{
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
});



function checkToken(req, res, next) {
    var token = req.headers['authorization'];
    jwt.verify(token, config.secret, (err, data) => {
        if (err){
            res.status(401).json({error: 'No Admin Authorization'});
        }
        else{
            res.locals = data;
            next();
        } 
    });
}

/**
 * DASHBOARD Page (GET)
 */


router.get("/dashboard", checkToken ,function(req, res, next){
    console.log("====+=======================================");
    // res.json(req.res.locals);
    User.find({}, function(err, users){
        res.json(users);
    });
    // // res.json(req.res.locals);
});


module.exports  =   router;