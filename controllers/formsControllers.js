const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const _logger = require('tracer').console();


module.exports['form-image'] = function(req, res, next) {

    res.render('page_form-image.html', { title: 'FORM' });
}
module.exports['upload'] = function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var old_path = files.file.path,
    file_size = files.file.name.split('.').pop(),
    index = old_path.lastIndexOf('/') + 1,
    file_name = old_path.substr(index),
    new_path = path.join(process.env.PWD, '/upload/', file_name + '.' );

  fs.readFile(old_path, function(err, data){
    fs.writeFile(new_path, data, function(err){
      if (err) {
        console.log(err);
        res.status(500);
        res.json({'success': false});
      } else {
        res.status(200);
        res.json({'success': true});
      }
    });
  });
  });

}
