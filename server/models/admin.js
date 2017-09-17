var mongoose    =   require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Admin Schema
 */
let adminSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
}, { collection: 'admins'});

let Admin = module.exports = mongoose.model('Admin', adminSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback){
    // Load hash from your password DB. 
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}