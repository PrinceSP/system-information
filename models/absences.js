const _logger = require('tracer').console()
const mongoose = require('mongoose');
const model_students = require('../models/students');
const model_users = require('../models/users');
var schema = {
  "username": {type:String, match:/^[a-z0-9]+$/i,minilength:3, maxlength:30, required:true}, //primary key
  "nis": {type:String, default:'-'},
  "class": {type:String, default:'-'},
}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('absences',schemaObject);
module.exports.model = model;

module.exports.submitAbsence=function(absenceData,callback){
  _logger.info('submitAbsence invok');
  var absence = model(absenceData);
  absence.save(function(e,o){
    _logger.info('absenceData invok' );
    console.log(e);
    if(e) return callback(false,o,e);
    else {
      callback(true,o,'success');
    }

  });
}

module.exports.deleteAbsence=function(id, callback){

  model.findByIdAndRemove(id, function(err, obj){
    var e = err;
    var o = obj;
    callback(e, o);
  });
}

module.exports.fetchdata = function(callback){

  model .find({},function(e,o){
    if(e) return callback(e,o);
    else {
      callback(e,o);
    }

  });
}
