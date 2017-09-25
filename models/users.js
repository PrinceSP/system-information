const _logger = require('tracer').console()
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
var schema = {
  "fullname": {type:String, default:'-'},
  "username": {type:String, match:/^[a-z0-9]+$/i,minilength:3, maxlength:30, required:true,index: {unique: true}}, //primary key
  "email": {type:String,minilength:2, maxlength:40, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,11})?$/, required:true, index: {unique: true}},
  "date_of_birth": {type:String, default:'-'},
  "handphone": {type:String, default:'-'},
  "address": {type:String, default:'-'},
  "password": {type:String, require:true},
  "createdon": {type:Number, require:true, default:new Date().getTime()},
  "modifiedon": {type:Number, require:true, default:new Date().getTime()},

}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('users',schemaObject);
module.exports.model = model;

module.exports.submitUser=function(userData,callback){
  var user = model(studentData);
  user.save(function(e,o){
    console.log(e);
    if(e) return callback(false,null,e);
    else {
      callback(true,o);
    }

  });
}

module.exports.fetchDataInputNis=function(inputnis,callback){
  model.findOne({username:inputnis},function(e,o){
    callback(e,o);
  });
}

module.exports.submitUser=function(userData,callback){
  var user = model(userData);
  user.save(function(e,o){
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
