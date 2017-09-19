const _logger = require('tracer').console()
const mongoose = require('mongoose');
var schema = {
  "class_number": {type:String, default:'-'},
  "department": {type:String, default:'-'},
  "fragment": {type:String, default:'-'},
  "class": {type:String, default:'-'},
}
module.exports.schema = schema;
var schemaObject = new mongoose.Schema(schema);
var model = mongoose.model('classes',schemaObject);
module.exports.model = model;
