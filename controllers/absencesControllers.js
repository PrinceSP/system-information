const _logger = require('tracer').console();
const models_absences = require('../models/absences');
module.exports['absensi-siswa'] = function(req, res, next) {
  models_absences.fetchdata(function(e,o) {

    res.render('page_absensi-siswa.html', { students:o,title: 'ABSENSI SISWA' });
  });
}