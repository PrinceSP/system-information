const _logger = require('tracer').console()
const mongoose = require('mongoose');
var schema = {
  "nis": {type:String, default:'-'},
  "class": {type:String, default:'-'},
  "lesson": {type:String, default:'-'},
  "date_and_time": {type:String, default:'-'},
}
module.exports.schema = schema;
var model = mongoose.model('absences',schemaObject);
module.exports.model = model;
