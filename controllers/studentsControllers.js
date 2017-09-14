const _logger = require('tracer').console();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const models_students = require('../models/students');
const models_users = require('../models/users');

module.exports['daftar-siswa'] = function(req, res, next) {
  models_students.fetchdataJoinUser(function(e,o){

    res.render('page_daftar-siswa.html', { students:o,title: 'DAFTAR SISWA' });

  });
}
module.exports['getsiswa'] = function(req, res, next) {
  var inputnis = req.query.nis;
  models_students.fetchDataInputNis(inputnis, function(e1,o1){
    models_users.fetchDataInputNis(o1.username, function(e2,o2){
      res.json({
          status:true,
          message:"test",
          students:o1,
          users:o2
      });
    });

  });

};
module.exports['form-siswa'] = function(req, res, next) {


    res.render('page_form-siswa.html', { title: 'FORM SISWA' });

}

module.exports['/upload'] = function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err,fields, files){
    var file_origin_name = files.file.name;
    var old_path = files.file.path;
    var file_extension = files.file.name.split('.').pop();
    var index = old_path.lastIndexOf('/') + 1;
    var file_name = old_path.substr(index);
    var new_path = path.join(process.env.PWD, '/upload/', file_name + '.' + file_extension);

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

module.exports['submit-input-siswa'] = function(req, res, next) {
  _logger.info('submit-input-siswa invok');
  var createdon=new Date().getTime();
  var modifiedon=createdon;
  var dataStudents={
    username:req.body.username,
    nis:req.body.nis,
    class:req.body.class,
    photo:req.body.photo,
    createdon:createdon,
    modifiedon:modifiedon,
    year_in:req.body.year_in
  }
  var dataUsers={
    fullname:req.body.fullname,
    username:req.body.username,
    email:req.body.email,
    date_of_birth:req.body.date_of_birth,
    handphone:req.body.handphone,
    address:req.body.address,
    photo:req.body.photo,
    createdon:createdon,
    modifiedon:modifiedon,
  }
  _logger.info('dataStudents ', dataStudents);
  models_students.submitStudent(dataStudents,function(status,o){
    _logger.info('submitStudent invok');

    models_users.submitUser(dataUsers,function(status,o){
      _logger.info('submitUser invok');


        var form = new formidable.IncomingForm();
        form.parse(req, function(err,fields, files){
          var file_origin_name = files.file.name;
          var old_path = files.file.path;
          var file_extension = files.file.name.split('.').pop();
          var index = old_path.lastIndexOf('/') + 1;
          var file_name = old_path.substr(index);
          var new_path = path.join(process.env.PWD, '/upload/', file_name + '.' + file_extension);

        fs.readFile(old_path, function(err, data){
          fs.writeFile(new_path, data, function(err){
            if (err) {
              console.log(err);
              res.status(500);
              res.json({'success': false});
            } else {
              res.json({
                fullname:req.body.fullname,
                username:req.body.username,
                email:req.body.email,
                date_of_birth:req.body.date_of_birth,
                handphone:req.body.handphone,
                address:req.body.address,
                year_in:req.body.year_in,
                class:req.body.class,
                nis:req.body.nis,
                photo:req.body.photo
              });
            }
          });
        });
      });


  });
  });
};
