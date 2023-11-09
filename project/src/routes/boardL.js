const express = require('express');
const db = require('../db/db_connect'); // db 연결 모듈로의 경로를 수정해야 합니다.
const router = express.Router();
const bodyParser = require('body-parser');

// 게시글 목록
router.get('/boardL', async (req, res, next) => {
  const selectBoardSql = 'SELECT board_number, board_title, nickname, board_date, view FROM board';
  try {
  
    await db.query(selectBoardSql , [board_number, board_title, nickname, board_date, view]);
    // 여기에서 데이터를 res.render로 전달하고 있어야 합니다.
    res.render('boardL', { boardList: rows });

  } catch (err) {
    console.error('게시글 목록 조회에 실패했습니다:', err);
    res.status(500).send('서버 오류');
  
  }
});

module.exports = router;
