const express = require('express');
const router = express.Router();

//치킨
router.get('/ckicken', (req, res) => {
    res.render('category/ckicken');
});

router.get('/nightfood', (req, res) => {
    res.render('category/nightfood');
});

router.get('/koreafood', (req, res) => {
    res.render('category/koreafood');
});

router.get('/pizza', (req, res) => {
    res.render('category/pizza');
});

router.get('/cafe', (req, res) => {
    res.render('category/cafe');
});

router.get('/CVS', (req, res) => {
    res.render('category/CVS');
});

router.get('/Chainstore', (req, res) => {
    res.render('category/Chainstore');
});

router.get('/chinafood', (req, res) => {
    res.render('category/chinafood');
});

router.get('/jok', (req, res) => {
    res.render('category/jok');
});

router.get('/jpfood', (req, res) => {
    res.render('category/jpfood');
});

router.get('/snackfood', (req, res) => {
    res.render('category/snackfood');
});

router.get('/onepersonorder', (req, res) => {
    res.render('category/onepersonorder');
});

//하위카테고리
router.get('/bbq', (req, res) => {
    res.render('category/bbq');
});

module.exports = router;