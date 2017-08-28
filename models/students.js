const _logger = require('tracer').console()
const mongoose = require('mongoose');
var schema = {
  "username": {type:String, match:/^[a-z0-9]+$/i,minilength:3, maxlength:30, required:true,index: {unique: true}}, //primary key
  "nis": {type:String, required:true,index: {unique: true}},
  "class": {type:String, default:'-'},
  "createdon": {type:Number, require:true, default:new Date().getTime()},
  "modifiedon": {type:Number, require:true, default:new Date().getTime()},
  "year_in": {type:String, default:'-'},
}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('students',schemaObject);
module.exports.model = model;

module.exports.submitStudent=function(studentData,callback){
  var student = model(studentData);
  student.save(function(e,o){
    console.log(e);
    if(e) return callback(false);
    else {
      callback(true,o);
    }

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
