const _logger = require('tracer').console()
const mongoose = require('mongoose');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const async = require('async');
const models_users = require('../models/users');

var schema = {
  "username": {type:String, match:/^[a-z0-9]+$/i,minilength:3, maxlength:30, required:true,index: {unique: true}}, //primary key
  "nis": {type:String, required:true,index: {unique: true}},
  "class": {type:String, default:'-'},
  "photo": {type:String, default:'-'},
  "createdon": {type:Number, require:true, default:new Date().getTime()},
  "modifiedon": {type:Number, require:true, default:new Date().getTime()},
  "year_in": {type:String, default:'-'},
}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('students',schemaObject);
module.exports.model = model;

const submitStudent=function(studentData,callback){
  _logger.info('submitStudent',submitStudent);
  var student = model(studentData);
  student.save(function(e,o){
    _logger.info('studentData', studentData);
    console.log(e);
    if(e) return callback(false,null,e);
    else {
      callback(true,o,'');
    }

  });
}

module.exports.submitStudent=submitStudent;

const fetchData = function(callback){

  model.find({},function(e,o){
    if(e) return callback(e,o);
    else {
      callback(e,o);
    }

  });
}

module.exports.fetchData=fetchData;

module.exports.deleteData=function(id, callback){
  // Todo.findByIdAndRemove
  model.findByIdAndRemove(id, function(err, obj){
    var e = err;
    var o = obj;
    callback(e, o);
  });
}

module.exports.fetchDataInputNis=function(inputnis,callback){
  model.findOne({nis:inputnis},function(e,o){
    callback(e,o);
  });
}


module.exports.fetchdataJoinUser = function(callback){
  _logger.info('fetchdataJoinUser invok');
  var fetchDataStudents=function(cb){
    _logger.info('fetchDataStudents invok');
    fetchData(function(e,o){
      _logger.info('fetchData invok');
      cb(e,o);
    });
  };

  var fetchDataUsersByDataStudents = function(students,cb){
    _logger.info('fetchDataUsersByDataStudents invok');
    models_users.model.find({
      username: { "$in": students.map(function(el){
                          var el_username = el.username;
                          return el_username;
                        })
                }
              }),function(e, users) {
                _logger.info('models_users invok');
                var users_map = {};
                users.forEach(function(v,k){
                  users_map[v.username] = v;
                });

                var result = students.map(function(u,k){
                  var r = u;
                  r['date_of_birth'] = users_map[u.username].date_of_birth;
                  r['handphone'] = users_map[u.username].handphone;
                  r['password'] = users_map[u.username].password;
                  return r;
                });
                callback(e,result);
              };



  }
  async.waterfall([
    fetchDataStudents,
    fetchDataUsersByDataStudents
],function(e,doc){
  if(e)console.log(e);
  callback(e,doc);
});
}
