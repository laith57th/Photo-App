const { errorPrint, successPrint } = require('../helpers/debug/debugprinters')

const routeProtectors = {};

//espress-recv-req -> m1 -> m2 -> m3 -> ... -> mwN -> router.HTTPVERB
routeProtectors.userIsLoggedIn = (req, res, next) => {
 if(req.session.username){
  successPrint('User is logged in');
  next();
 }else{
  errorPrint('user is not logged in!');
  req.flash('error', 'You must be logged in to create a post!');
  req.session.save(err => {
   res.redirect('/login');
 })
 }
}

module.exports = routeProtectors;