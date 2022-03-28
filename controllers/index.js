class IndexControllers {
  // Show Home Page
  static getHomePage(req, res, next) {
    res.render('index');
  }

  // Show Dashboard
  static getDashboardPage(req, res, next) {
    res.render('dashboard', {
      username: req.user.username || req.user.displayName,
    });
  }
}

module.exports = IndexControllers;