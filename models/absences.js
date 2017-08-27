const _logger = require('tracer').console()
const mongoose = require('mongoose');
var schema = {
  "nis": {type:String, default:'-'},
  "class": {type:String, default:'-'},
  "lesson": {type:String, default:'-'},
  "date_and_time": {type:String, default:'-'},
}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('absences',schemaObject);
module.exports.model = model;

module.exports.submitAbsence=function(absenceData,callback){
  var student = model(absenceData);
  absence.save(function(e,o){
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
