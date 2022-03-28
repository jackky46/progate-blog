const passport = require('passport');
const User = require("../models/users");

class UserController {
  // Show Register Page
  static getRegisterPage(req, res, next) {
    res.render('register');
  }

  // Handle Register Request
  static registerUser(req, res, next) {
    User.create(req.con, req.body, () => {
      res.redirect('/');
    });
  }

  // Show Login Page
  static getLoginPage(req, res, next) {
    res.render('login');
  }

  // Handle Login Page
  static loginUser(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
    })(req, res, next);
  }

  // Handle Login Request
  static logoutUser(req, res, next) {
    req.logout();
    res.redirect('/');
  }

  // Handle Facebook Login AUTH
  static facebookLogin(req, res, next) {
    passport.authenticate("facebook")(req, res, next);
  }

  // Handle Facebook Login AUTH Response
  static facebookLoginCallback(req, res, next) {
    passport.authenticate("facebook", {
      successRedirect: "/dashboard",
      failureRedirect: "/"
    })(req, res, next);
  }
}

module.exports = UserController;