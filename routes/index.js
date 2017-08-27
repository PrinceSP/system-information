var express = require('express');
var router = express.Router();
var model_students = require('../models/students');
var model_users = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});
router.get('/daftar-siswa', function(req, res, next) {
  model_students.fetchdata(function(e,o){

    res.render('page_daftar-siswa.html', { students:o,title: 'DAFTAR SISWA' });

  });

});
router.get('/absensi-siswa', function(req, res, next) {
  res.render('page_absensi-siswa.html', { title: 'ABSENSI SISWA'});
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
router.get('/input-siswa', function(req, res, next) {
  res.render('page_input-siswa.html', { title: 'INPUT SISWA'});
});
router.post('/submit-input-siswa', function(req, res, next) {
  var createdon=new Date().getTime();
  var modifiedon=createdon;
  var dataStudents={
    username:req.body.username,
    nis:req.body.nis,
    class:req.body.class,
    createdon:createdon,
    modifiedon:modifiedon,
    year_in:req.body.year_in
  }
  var dataUsers={
    fullname:req.body.fullname,
    username:req.body.username,
    email:req.body.email,
    date_of_birth:req.body.date_of_birth,
    handphone:req.body.handphone,
    address:req.body.address,
    createdon:createdon,
    modifiedon:modifiedon,
  }
  model_students.submitStudent(dataStudents,function(status,o){

    res.json({
      fullname:req.body.fullname,
      username:req.body.username,
      email:req.body.email,
      date_of_birth:req.body.date_of_birth,
      handphone:req.body.handphone,
      address:req.body.address,
      year_in:req.body.year_in,
      class:req.body.class,
      nis:req.body.nis,
      photo:req.body.photo
    });
  });
});

module.exports = router;
