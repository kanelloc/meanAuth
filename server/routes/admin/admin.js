const express   =   require('express');
const router    =   express.Router();
const passport  =   require('passport');
const jwt       =   require('jsonwebtoken');
var bcrypt       =   require('bcryptjs');

// Models
const User  =   require('../models/user');
const Admin  =   require('../../models/admin');

module.exports  =   router;