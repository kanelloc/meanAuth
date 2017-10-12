const express   =   require('express');
const router    =   express.Router();
const passport  =   require('passport');
const jwt       =   require('jsonwebtoken');
var bcrypt       =   require('bcryptjs');
var config = require('../../config/config');

// Models
const User  =   require('../../models/user');
const Admin  =   require('../../models/admin');

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

/*
|--------------------------------------------------------------------------
| USER CRUD
|--------------------------------------------------------------------------
*/

/**
 * Delete User (DELETE)
 */
router.delete('/delete-user/:id',checkToken, function(req, res, next) {
    const query = {_id:req.params.id}
    User.remove(query, function(err) {
        if (err) {
            res.status(401).json({error: 'No User found'});
        } else{
            return res.json({success: true, msg: 'User deleted'});
        }
    });
});
module.exports  =   router;