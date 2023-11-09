const express = require('express');
const db = require('../db/db_connect');
const bcrypt = require('bcrypt');
const router = express.Router();
const session = require('express-session');

// router.post('/', async (req, res, next) => {
//     const { userid, password } = req.body;

//     const sql = "SELECT * FROM user WHERE userid = ? AND password = ?";
//     db.query(sql, [userid, password], function (error, results, fields) {
//         if (error) {
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         if (results.length === 0) {
//             res.status(401).send('아이디를 찾을 수 없습니다');
//             return;
//         }

//         const hashedPassword = results[0].password;

//         bcrypt.compare(password, hashedPassword, (compareErr, isMatch) => {
//             if (compareErr) {
//                 res.status(500).send('Internal Server Error');
//                 return;
//             }

//             if (isMatch) {
//                 req.session.userid = userid;
//                 res.redirect('/'); 
//             } else {
//                 res.status(401).send('Invalid password');
//             }
//         });
//     });
// });

router.post('/login', async (req, res) =>{
    var userid = req.body.userid;
    var password = req.body.password;
    if (userid && password) {             // id와 pw가 입력되었는지 확인
        
        db.query('SELECT * FROM user WHERE userid = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                req.session.is_logined = true;      // 세션 정보 갱신
                req.session.nickname = nickname;
                req.session.save(async => {
                    res.redirect(`/`);
                });
            } else {              
                res.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/login/loginpage";</script>`);    
            }            
        });

    } else {
        response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/login/loginpage";</script>`);    
    }
});


//------------- ::: 로그인 상태 유지  ::: ------------- //
//로그인 확인 미들웨어
function ensureAuthenticated(req, res, next) {
    if (req.session.userid) {
        return next(); // 로그인이 되어 있다면, 다음 미들웨어 또는 라우터 핸들러로 이동
    } else {
        res.status(403).send('로그인이 필요합니다.'); // 로그인이 되어 있지 않다면, 에러 메시지 반환
    }
}

router.get('/checkLogin', (req, res) => {
    if (req.session.userid) {
        res.json({ loggedIn: true, userid: req.session.userid });
    } else {
        res.json({ loggedIn: false });
    }
});
//---------------------------------------------------//


//------------- ::: 로  그  아  웃 ::: ------------- //
router.get('/logout', (req, res) => {
    req.session.destroy();
    // res.send('Logged out successfully.');
    res.redirect('/');  // 홈화면으로 리다이렉트
});
//---------------------------------------------------//


//------------- ::: 유  저  정  보 ::: ------------- //
//유저 정보 가져오기
router.get('/getUserInfo', ensureAuthenticated, (req, res) => {
    const sql = "SELECT * FROM user WHERE userid = ?";
    db.query(sql, [req.session.userid], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

//유저 정보 업데이트
router.post('/updateUserInfo', ensureAuthenticated, (req, res) => {
    const { name, birthday } = req.body;
    const sql = "UPDATE user SET userName = ?, birthday = ? WHERE userid = ?";
    db.query(sql, [name, birthday, req.session.userid], (err, results) => {
        if (err) throw err;
        res.send('정보가 성공적으로 업데이트되었습니다.');
    });
});

module.exports = router;
