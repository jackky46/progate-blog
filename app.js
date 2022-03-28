const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

const blogsRouter = require("./routes/blogs");
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

// MySQL
const mysql = require("mysql");

// Passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const user = require('./models/users');

// Facebook Login Integration
const FacebookStrategy = require('passport-facebook').Strategy;


const app = express();

// setup database
const con = mysql.createConnection({
  host: 'remotemysql.com',
  port: 3306,
  user: 'fv2fduovCD',
  password: 'xHbw5k5d2w',
  database: 'fv2fduovCD'
})
con.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

// store the con inside the req
app.use((req, res, next) => {
  req.con = con
  next()
})


/* Express Session Start*/
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
/* Express Session END */


/* Passport Config Start */
passport.use(
  new localStrategy((username, password, done) => {
    user.findOne(con, { username: username }, (err, rows) => {
      const User = rows[0]

      // Handle if user is not found!
      if (!User) {
        return done(null, false);
      }
      if (User.password === password) {
        return done(null, User);
      }
      // Handle if password does not match
      else {
        return done(null, false);
      }
    })
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
/* Passport Config END */


/* Passport Middleware Start */
app.use(passport.initialize());
app.use(passport.session());
/* Passport Middleware END */


/* Facebook Login Start */
passport.use(new FacebookStrategy({
  clientID: "362202375601201",
  clientSecret: "33844f07237215efadbaad1c6aac0fd6",
  callbackURL: "http://localhost:3000/users/facebook-login/callback"
},

  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }

));
/* Facebook Login END */




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
/* Blog Section START */
app.use("/blogs", blogsRouter);
/* Blog Section END */

module.exports = app;