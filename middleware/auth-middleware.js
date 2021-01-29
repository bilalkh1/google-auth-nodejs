module.exports = {
   // Check if the user is authenticated
    checkAuth: (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/')
      }
    },
    checkNotAuth: (req, res, next) => {
      if (!req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/admin');
      }
    },
  }