const _logger = require('tracer').console();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const models_users = require('../models/users');
const models_students = require('../models/students');
const models_absences = require('../models/absences');

module.exports['absensi-siswa'] = function(req, res, next) {
  models_absences.fetchdata(function(e,o) {

    res.render('page_absensi-siswa.html', { absences:o,title: 'ABSENSI SISWA' });
  });
}

module.exports['delete-absence'] = function(req, res, next) {
  var id = req.query.id; //data id yang akan di delete
  models_absences.deleteAbsence(id, function(e1,o2){
    _logger.info('id invok');
    var message = '';
    if (e1) {
      message = 'failed delete data';
    } else {
      message = 'success delete data';
    }
    res.redirect('/absensi-siswa?message='+message);
  });
}

module.exports['absensi-digital'] = function(req, res, next) {
  res.render('page_absensi-digital.html', { title: 'ABSENSI DIGITAL' });
}
module.exports['/public/upload'] = function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err,fields, files){
    var file_origin_name = files.file.name;
    var old_path = files.file.path;
    var file_extension = files.file.name.split('.').pop();
    var index = old_path.lastIndexOf('/') + 1;
    var file_name = old_path.substr(index);
    var new_file_name = file_name + '.' + file_extension;
    var new_path = path.join(process.env.PWD, '/public/upload/', new_file_name);

  fs.readFile(old_path, function(err, data){
    fs.writeFile(new_path, data, function(err){
      if (err) {
        console.log(err);
        res.status(500);
        res.json({'success': false});
      } else {
        res.status(200);
        res.json({'success': true});
      }
    });
  });
});
};
