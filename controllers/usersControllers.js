const _logger = require('tracer').console();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const models_users = require('../models/users');
module.exports['daftar-user'] = function(req, res, next) {
  models_users.fetchdata(function(e,o){

    res.render('page_daftar-user.html', { users:o,title: 'DAFTAR USER' });

  });
}

module.exports['form-user'] = function(req, res, next) {
    res.render('page_form-user.html', { title: 'FORM USER' });
}
