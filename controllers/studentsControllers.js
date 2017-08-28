const _logger = require('tracer').console();
const models_students = require('../models/students');
const models_users = require('../models/users');

module.exports['daftar-siswa'] = function(req, res, next) {
  models_students.fetchdataJoinUser(function(e,o){

    res.render('page_daftar-siswa.html', { students:o,title: 'DAFTAR SISWA' });

  });
}
module.exports['input-siswa'] = function(req, res, next) {


    res.render('page_input-siswa', { title: 'INPUT SISWA' });

}

module.exports['submit-input-siswa'] = function(req, res, next) {
  var createdon=new Date().getTime();
  var modifiedon=createdon;
  var dataStudents={
    username:req.body.username,
    nis:req.body.nis,
    class:req.body.class,
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
    password:'123456',
    createdon:createdon,
    modifiedon:modifiedon,
  }
  models_students.submitStudent(dataStudents,function(status,o){

    models_users.submitUser(dataUsers,function(status,o){



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
  });
  });
};
