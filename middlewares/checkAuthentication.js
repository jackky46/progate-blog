// Authentication Check
const checkAuthentication = (req, res, next) => {

  if (req.isAuthenticated()) {
    return next();
  }
  // Handle if user is not logged in yet
  else {
    res.redirect('/users/login');
  }
}

module.exports = checkAuthentication;