const express = require('express');
const db = require('../db/db_connect');
const router = express.Router();

// 게시판 글쓰기
router.post('/', async (req, res, next) => {
    const { board_title, nickname, content, board_date } = req.body;
  
    // 게시물 데이터를 데이터베이스에 삽입
    const insertBoardSql = 'INSERT INTO board (board_title, nickname, content, board_date) VALUES (?, ?, ?, ?)';
    
    try {
      await db.query(insertBoardSql, [board_title, nickname, content, board_date]);
      console.log('게시물이 성공적으로 등록되었습니다.');
      res.redirect('/boardL');
    } catch (err) {
      console.error('게시글 작성에 실패했습니다:', err);
      res.status(500).send('서버 오류');
    }
});
  
  module.exports = router;
  