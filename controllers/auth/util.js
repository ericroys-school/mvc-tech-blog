export const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };

export const getSessionVars= (req) => {
  let {uid, isLoggedIn } = req.session || {uid: "", isLoggedIn: false};
  return {uid, isLoggedIn}
}
  
