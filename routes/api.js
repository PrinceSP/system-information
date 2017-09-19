var express = require('express');
var router = express.Router();
const _controllers_students = require('../controllers/studentsControllers');
const _controllers_absences = require('../controllers/absencesControllers');
const _controllers_users = require('../controllers/usersControllers');


var model_students = require('../models/students');
var model_users = require('../models/users');
var model_absences = require('../models/absences');


router.get(['/getsiswa'], [], _controllers_students['getsiswa']);

module.exports = router;
