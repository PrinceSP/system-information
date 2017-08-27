const _logger = require('tracer').console();
const models_users = require('../models/users');
module.exports['daftar-user'] = function(req, res, next) {
  models_users.fetchdata(function(e,o){

    res.render('page_daftar-user.html', { users:o,title: 'DAFTAR USER' });

  });
}
