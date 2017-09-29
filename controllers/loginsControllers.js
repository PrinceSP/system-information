const _logger = require('tracer').console();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
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
module.exports['submit-register'] = function(req, res, next) {
  // collect data-data dari form
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
          fullname1:fields.fullname1,
          username:fields.username,
          email:fields.email,
          password:fields.password,
          date_of_birth:fields.date_of_birth,
          handphone:fields.handphone,
          address:fields.address,
          photo:new_file_name,
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
          //langsung direct page  setelah success insert data
          res.redirect('/login');
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
}
