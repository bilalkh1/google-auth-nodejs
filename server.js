const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const db = require("./models");
const authRoutes = require('./routes/user-routes');
const passport = require('passport');
const passportConfig = require('./config/passport');

const app = express();

// Setup sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000}
}));

// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Setup Auth Routes
app.use('/', authRoutes);


// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Setup Passport
passportConfig(passport);

db.sequelize.sync().then(() => {
    // Start the server
    server = app.listen(3100, err => {
        if (err) {
            console.error('Error ', err)
        }
        else{
            console.log('Started on port 3000')
        } 
    });
});

