// This is 'Auth.js' file of Coastal Hacks Hackathon

// Authentication Module
module.exports = {
    isAuth: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    },
};