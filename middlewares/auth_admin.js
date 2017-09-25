module.exports = function(req, res, next){
  if (req.session.user != null) {
    next();
  } else {
    res.redirect('/login');
  }
}
