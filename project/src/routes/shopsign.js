const express = require('express');
const db = require('../db/db_connect');
const bcrypt = require('bcrypt');
const router = express.Router();
// 사업자 회원 가입 요청 처리

router.post('/', async (req, res, next ) => {
        const { shopid, password, storename, address, businessnumber, shoptel, category } = req.body;

// 중복된 아이디 체크
const duplicateCheckQuery = 'SELECT shopid FROM shop WHERE shopid = ?';

try {
  const [rows] = await db.query(duplicateCheckQuery, [shopid]);

  if (rows.length > 0) {
    // 중복된 아이디인 경우
    return res.status(400).json({ message: '중복된 아이디입니다.' });
  }
} catch (err) {
  console.error('중복 확인 쿼리 오류:', err);
  return res.status(500).send('서버 오류');
}

  // 비밀번호 해싱
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.error('비밀번호 해싱 오류:', err);
      return res.status(500).send('서버 오류');
    }

    const hashedPassword = hash;

    const insertQuery = 'INSERT INTO shop (shopid, password, storename, address, businessnumber, shoptel, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
      await db.query(insertQuery, [shopid, hashedPassword, storename, address, businessnumber, shoptel, category]);
      res.redirect('/loginpage');
    } catch (err) {
      console.error('데이터베이스 저장 오류:', err);
      res.status(500).send('서버 오류');
    }
  });
});
module.exports = router;