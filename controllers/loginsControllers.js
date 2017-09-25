const _logger = require('tracer').console();

module.exports['login'] = function(req, res, next) {
  res.render('page_login.html', { title: 'LOGIN',msg:''});
}
module.exports['register'] = function(req, res, next) {
  res.render('page_register.html', { title: 'REGISTER' });
}

module.exports['submit-login'] = function(req, res, next) {
  var isLoginSuccess = true;
  var email = req.body.mail;
  var password = req.body.password;
  var message = (isLoginSuccess)? 'login success':'invalid name or password'
  res.render('page_login.html', { title: 'LOGIN',msg:message});
}
