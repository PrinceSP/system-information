const _logger = require('tracer').console();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const models_users = require('../models/users');
const models_students = require('../models/students');
const util = require('../utils/utilFunction');
module.exports['daftar-user'] = function(req, res, next) {
  models_users.fetchdata(function(e,o){

    res.render('page_daftar-user.html', { users:o,title: 'DAFTAR USER' });

  });
}

module.exports['form-user'] = function(req, res, next) {
    res.render('page_form-user.html', { title: 'FORM USER' });
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

module.exports['submit-input-user'] = function(req, res, next) {
  _logger.info('submit-input-user invok');
    var form = new formidable.IncomingForm();
    form.parse(req, function(err,fields, files){
    _logger.info('fields=>',fields);
    _logger.info('files=>',files);
        //baca meta data file
          var file_origin_name = files.photo.name;
          var old_path = files.photo.path;
          var file_extension = files.photo.name.split('.').pop();
          var index = old_path.lastIndexOf('/') + 1;
          var file_name = old_path.substr(index);
          var new_file_name = file_name + '.' + file_extension;
          var new_path = path.join(process.env.PWD, '/public/upload/', new_file_name);


          //collect data-data dari form
          var createdon=new Date().getTime();
          var modifiedon=createdon;

          var dataUsers={
            fullname:fields.fullname,
            username:fields.username,
            email:fields.email,
            date_of_birth:fields.date_of_birth,
            handphone:fields.handphone,
            photo:new_file_name,
            password:fields.password,
            address:fields.address,
            createdon:createdon,
            modifiedon:modifiedon,
          }


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
            res.redirect('/daftar-user');
          }
          var out_error = function(msg){
            res.json({status:false, msg:msg});
          }

          util.encryptPassword(dataUsers.password,function(passwordEncrypted){
            dataUsers.password = passwordEncrypted;
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
          }); //end util.encryptPassword


        });//end form.parse
};
