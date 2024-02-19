const express = require('express');
const router = express.Router();

//로그인페이지 이동
router.get('/loginpage', (req, res) => {
    res.render('login/login');
});
//id찾기 페이지 이동
router.get('/findid', (req, res) => {
    res.render('login/findid');
});
//비밀번호찾기 페이지이동
router.get('/findPwd', (req, res) => {
    res.render('login/findPwd');
});
//마이페이지 이동
router.get('/mypage', (req, res) => {
    res.render('login/mypage');
});
//사업자회원가입이동
router.get('/OperatorsSignup', (req, res) => {
    res.render('login/OperatorsSignup');
});
//유저 회원가입 이동
router.get('/UserSingup', (req, res) => {
    res.render('login/UserSingup');
});
//회원가입 페이지 이동
router.get('/signup', (req, res) => {
    res.render('login/signup');
});

// 관리자 페이지(로그인/회원가입) 라우터
router.get('/adminpage', (req, res) => {
    res.render('admin/adminpage');
});
// 관리자 로그인
router.get('/adminlogin', (req, res) => {
    res.render('admin/adminlogin');
});
// 관리자 회원가입
router.get('/adminsignup', (req, res) => {
    res.render('admin/adminsignup');
});

module.exports = routes;
