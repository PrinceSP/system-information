const _logger = require('tracer').console();
const util = require('../utils/utilFunction');
const models_users = require('../models/users');

module.exports['login'] = function(req, res, next) {
  res.render('page_login.html', { title: 'LOGIN',msg:''});
}
module.exports['logout'] = function(req, res, next) {
  req.session.user = null;
  res.redirect('/login');
}
module.exports['register'] = function(req, res, next) {
  res.render('page_register.html', { title: 'REGISTER' });
}

module.exports['submit-login'] = function(req, res, next) {
  var isLoginSuccess = true;
  var email = req.body.mail;
  var password = req.body.password;
  var out = function(o){
    var message = (isLoginSuccess)? 'login success':'invalid name or password'
    if (isLoginSuccess){
      req.session.user=o;
      res.redirect('/');
    } else {
      res.render('page_login.html', { title: 'LOGIN',msg:message});
    }

  }

  models_users.fetchDataByEmail(email, function(e,o) {
    _logger.info('dataUser=', o);
    if (!o){
      isLoginSuccess = false;
      out();
    } else {
      util.validatePassword(password, o.password || '', function(x, statusValidatePassword){
        if (!statusValidatePassword) {
          isLoginSuccess = false;
        }
        out(o);
      });
    }


  });
}
