export const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
