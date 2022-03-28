// Passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const user = require('./models/users');

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