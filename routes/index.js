var express = require('express');
var router = express.Router();
const _controllers_students = require('../controllers/studentsControllers');
const _controllers_absences = require('../controllers/absencesControllers');
const _controllers_users = require('../controllers/usersControllers');
const _controllers_logins = require('../controllers/loginsControllers');
const _middlewares_auth_admin = require('../middlewares/auth_admin');

var model_students = require('../models/students');
var model_users = require('../models/users');
var model_absences = require('../models/absences');

router.get(['/daftar-siswa'], [_middlewares_auth_admin], _controllers_students['daftar-siswa']);
router.get(['/absensi-siswa'], [_middlewares_auth_admin], _controllers_absences['absensi-siswa']);
router.get(['/form-siswa'], [], _controllers_students['form-siswa']);
router.get(['/form-user'], [], _controllers_users['form-user']);
router.post(['/submit-input-siswa'], [], _controllers_students['submit-input-siswa']);
router.get(['/daftar-user'], [_middlewares_auth_admin], _controllers_users['daftar-user']);
router.get(['/absensi-digital'],[], _controllers_absences['absensi-digital']);
router.get(['/login'],[], _controllers_logins['login']);
router.get(['/logout'],[], _controllers_logins['logout']);
router.get(['/delete-absence'],[], _controllers_absences['delete-absence']);
router.get(['/register'],[], _controllers_logins['register']);
router.get(['/delete-user'],[], _controllers_users['delete-user']);
router.post(['/submit-login'],[], _controllers_logins['submit-login']);
router.post(['/submit-register'],[], _controllers_logins['submit-register']);
router.post(['/submit-input-user'],[], _controllers_users['submit-input-user']);
router.get(['/delete-siswa'],[], _controllers_students['delete-siswa']);


/* GET home page. */
router.get('/',[_middlewares_auth_admin], function(req, res, next) {
  res.render('index', { title: 'HOME' });
});
router.get('/Kelas-X', function(req, res, next) {
  res.render('page_Kelas-X.html', { title: 'KELAS X'});
});
router.get('/ak', function(req, res, next) {
  res.render('page_ak.html', { title: 'AKUNTANSI'});
});
router.get('/ap', function(req, res, next) {
  res.render('page_ap.html', { title: 'ADMINISTRASI PERKANTORAN'});
});
router.get('/mp', function(req, res, next) {
  res.render('page_mp.html', { title: 'MANAJEMEN PEMASARAN'});
});
router.get('/pb', function(req, res, next) {
  res.render('page_pb.html', { title: 'PERBANKAN'});
});
router.get('/tkj', function(req, res, next) {
  res.render('page_tkj.html', { title: 'TEKNIK KOMPUTER dan JARINGAN'});
});
router.get('/upw', function(req, res, next) {
  res.render('page_upw.html', { title: 'USAHA PERJALANAN WISATA'});
});
router.get('/Kelas-XI', function(req, res, next) {
  res.render('page_Kelas-XI.html', { title: 'KELAS XI'});
});
router.get('/ak11', function(req, res, next) {
  res.render('page_ak11.html', { title: 'AKUNTANSI'});
});
router.get('/ap11', function(req, res, next) {
  res.render('page_ap11.html', { title: 'ADMINISTRASI PERKANTORAN'});
});
router.get('/mp11', function(req, res, next) {
  res.render('page_mp11.html', { title: 'MANAJEMEN PEMASARAN'});
});
router.get('/pb11', function(req, res, next) {
  res.render('page_pb11.html', { title: 'PERBANKAN'});
});
router.get('/tkj11', function(req, res, next) {
  res.render('page_tkj11.html', { title: 'TEKNIK KOMPUTER dan JARINGAN'});
});
router.get('/upw11', function(req, res, next) {
  res.render('page_upw11.html', { title: 'USAHA PERJALANAN WISATA'});
});
router.get('/Kelas-XII', function(req, res, next) {
  res.render('page_Kelas-XII.html', { title: 'KELAS X'});
});
router.get('/ak12', function(req, res, next) {
  res.render('page_ak12.html', { title: 'AKUNTANSI'});
});
router.get('/ap12', function(req, res, next) {
  res.render('page_ap12.html', { title: 'ADMINISTRASI PERKANTORAN'});
});
router.get('/mp12', function(req, res, next) {
  res.render('page_mp12.html', { title: 'MANAJEMEN PEMASARAN'});
});
router.get('/pb12', function(req, res, next) {
  res.render('page_pb12.html', { title: 'PERBANKAN'});
});
router.get('/tkj12', function(req, res, next) {
  res.render('page_tkj12.html', { title: 'TEKNIK KOMPUTER dan JARINGAN'});
});
router.get('/upw12', function(req, res, next) {
  res.render('page_upw12.html', { title: 'USAHA PERJALANAN WISATA'});
});

module.exports = router;
