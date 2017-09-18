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
    var form = new formidable.IncomingForm();
    form.parse(req, function(err,fields, files){
        //baca meta data file
          var file_origin_name = files.photo.name;
          var old_path = files.photo.path;
          var file_extension = files.photo.name.split('.').pop();
          var index = old_path.lastIndexOf('/') + 1;
          var file_name = old_path.substr(index);
          var new_path = path.join(process.env.PWD, '/upload/', file_name + '.' + file_extension);

          //collect data-data dari form
          var createdon=new Date().getTime();
          var modifiedon=createdon;
          var dataStudents={
            username:fields.username,
            nis:fields.nis,
            class:fields.class,
            photo:fields.photo,
            createdon:createdon,
            modifiedon:modifiedon,
            year_in:fields.year_in
          }
          var dataUsers={
            fullname:fields.fullname,
            username:fields.username,
            email:fields.email,
            date_of_birth:fields.date_of_birth,
            handphone:fields.handphone,
            address:fields.address,
            photo:fields.photo,
            createdon:createdon,
            modifiedon:modifiedon,
          }
          _logger.info('dataStudents ', dataStudents);

          var out_success = function(){
            // res.json({
            //   fullname:req.body.fullname,
            //   username:req.body.username,
            //   email:req.body.email,
            //   date_of_birth:req.body.date_of_birth,
            //   handphone:req.body.handphone,
            //   address:req.body.address,
            //   year_in:req.body.year_in,
            //   class:req.body.class,
            //   nis:req.body.nis,
            //   photo:req.body.photo
            // });
            //langsung direct page aja setelah success insert data
            res.redirect('/daftar-siswa');
          }
          var out_error = function(msg){
            res.json({status:false, msg:msg});
          }

          //submit data ke table student
          models_students.submitStudent(dataStudents,function(status,o,msg){
            _logger.info('dataStudents', dataStudents);
            if(!status) return out_error(msg);
            //submit data ke table user
            models_users.submitUser(dataUsers,function(status,o,msg){
              if(!status) return out_error(msg);
              //uplad photo dari local ke server
              fs.readFile(old_path, function(err, data){
                fs.writeFile(new_path, data, function(err){
                  if (err) {
                    console.log('gagal upload photo.', err);
                  }
                  return out_success();
                });
              });
            });//end models_users.submitUser
          }); //end models_students.submitStudent

        });//end form.parse
};
