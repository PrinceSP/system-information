const _logger = require('tracer').console()
const mongoose = require('mongoose');
var schema = {
  "fullname": {type:String, default:'-'},
  "nis": {type:String, required:true,index: {unique: true}},
  "date_time": {type:Number, default:'-'},

}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('absences',schemaObject);
module.exports.model = model;

module.exports.submitAbsence=function(absenceData,callback){
  _logger.info('submitAbsence',submitAbsence);
  var student = model(absenceData);
  absence.save(function(e,o){
    _logger.info('absenceData',absenceData);
    console.log(e);
    if(e) return callback(false,null,e);
    else {
      callback(true,o,'');
    }

  });
}

module.exports.fetchdata = function(callback){

  model.find({},function(e,o){
    if(e) return callback(e,o);
    else {
      callback(e,o);
    }

  });
}
