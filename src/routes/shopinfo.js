const express = require('express');
const db = require('../db/db_connect'); // db 연결 모듈로의 경로를 수정해야 합니다.
const router = express.Router();


// 가맹점 가입자 정보를 반환하는 API 엔드포인트
router.get('/shopinfo', (req, res) => {

  const query = 'SELECT * FROM shop'; 
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('<p>데이터를 가져오는 중에 오류가 발생했습니다.</p>');
      return;
    }
    // EJS 템플릿을 사용하여 데이터를 렌더링
    res.render('shopinfo', { shopdata: results });
  });
});

module.exports = router;