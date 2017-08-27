const _logger = require('tracer').console();
_logger.info('bootstrap invoked');

var mongoose = require('mongoose');
var _config = require('./config');
require('./mongoose-connection');
