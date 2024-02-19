const db = require('../db/db_connect');

const bcrypt = require('bcrypt'); // 비밀번호 암호화..! (보안)

module.exports = function(app) {
    app.post('/register', (req, res) => {
        // 회원가입 로직
        const { userID, password, userName, birthday, hobby } = req.body;

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;

            const sql = "INSERT INTO user (userID, name, password, nickname,email, tel, address, birth, gender, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(sql, [userID, name, hash, nickname,email, tel, address, birth, gender, category], (err, result) => {
                if (err) throw err;
                res.send('User registered successfully');
            });
        });
    });
};