export const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };

// extract and return the session variables
export const getSessionVars= (req) => {
  let {uid, isLoggedIn } = req.session || {uid: "", isLoggedIn: false};
  return {uid, isLoggedIn}
}
  
