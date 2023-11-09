const express = require('express');
const db = require('../db/db_connect'); // db 연결 모듈로의 경로를 수정해야 합니다.
const router = express.Router();

router.get('/userinfo', (req, res) => {
  // 클라이언트에게 보낼 HTML 템플릿
  const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>사용자 정보</title>
      </head>
      <body>
          <h1>사용자 정보</h1>
          <div id="content">
              <!-- 여기에 정보가 표시됩니다 -->
          </div>
          <script src="/userinfo.js"></script>
      </body>
      </html>
  `;

  res.send(html);
});

router.get('/userinfo', (req, res) => {
  
  res.sendFile(__dirname + '/userinfo');
});

module.exports = router;
