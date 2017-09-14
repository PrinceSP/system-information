const _logger = require('tracer').console();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const models_absences = require('../models/absences');

module.exports['absensi-siswa'] = function(req, res, next) {
  models_absences.fetchdata(function(e,o) {

    res.render('page_absensi-siswa.html', { students:o,title: 'ABSENSI SISWA' });
  });
}
module.exports['absensi-digital'] = function(req, res, next) {
  res.render('page_absensi-digital.html', { title: 'ABSENSI DIGITAL' });
}
