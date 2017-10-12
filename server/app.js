var express     =   require('express');
var path        =   require('path');
var bodyParser  =   require('body-parser');
var mongoose    =   require('mongoose');
var cors        =   require('cors');
var passport    = require('passport');

require('./config/passport')(passport);

mongoose.connect('mongodb://localhost/meanAuth');
let db = mongoose.connection;

//Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
})

//Check for db errors
db.on('error', function(err){
    console.log(err);
});

const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS Middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Home Route
app.get('/', function(req, res){
    res.send('Invalid Endpoint');
});

// Router section
let users = require('./routes/users');
app.use('/users', users);

let admins = require('./routes/auth/auth-admins');
app.use('/admins', admins);

let admin = require('./routes/admin/admin');
app.use('/admin', admin);

// Start Server
app.listen(3000, function () {
    console.log('Server started on port 3000....')
});