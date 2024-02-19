var express = require('express'); // 필요 모듈들 다운 npm install 모듈명
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const bcrypt = require('bcrypt');
const passwordToHash = 'your_password_here';

const path = require('path');
const app = express();
const port = 3000;

//앱세팅
app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');

// var apiRouter = require('./api_search');
// 다른 라우터 등록도 필요하면 여기에 추가합니다.
// + login.js  register.js를 불러오는 코드
const loginRoutes = require('./src/routes/login');

const usersingRoutes = require('../project/src/routes/usersing');
usersingRoutes(app);

const registerRoutes = require('./src/routes/register');
// app.use(express.static(path.join(__dirname, 'public')));

const db = require('../project/src/db/db_connect');

usersingRoutes(app);
// 정적 파일 서비스 !!!! (views폴더) :
app.use(express.static('project'));
app.use(express.static('css'));
app.use(express.static('img'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '~~~',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}));

// app.use('/api_search', apiRouter); // API 라우터 연결
// // 다른 라우터 연결도 필요하면 여기에 추가

// public 디렉터리에서 정적 파일을 제공합니다.
app.use(express.static(path.join(__dirname, 'project')));

// 루트 경로에 대한 라우트 핸들러
app.get('/', (req, res) => {
    res.render('home/index'); // 여러분의 HTML 파일이 루트 디렉터리에 index.html로 저장되어 있다고 가정합니다.
});

app.get('/header', (req, res) => {
    res.render('home/header');
});

app.get('/event', (req, res) => {
    res.render('home/event');
});

app.get('/guide', (req, res) => {
    res.render('home/guide');
});

app.get('/boardL', (req, res) => {
    res.render('home/boardL');
});

app.get('/boardW', (req, res) => {
    res.render('home/boardW');
});

app.get('/footer', (req, res) => {
    res.render('home/footer');
});



// bcrypt.hash(passwordToHash, salt, (err, hash) => {
//     if (err) {
//         console.error('비밀번호 해싱 중 오류 발생:', err);
//         // 에러 메시지를 클라이언트에 전송하거나 다른 오류 처리 동작을 수행할 수 있습니다.
//     } else {
//         // 해싱이 성공한 경우, 해시된 비밀번호를 `hash` 변수에 저장
//         const hashedPassword = hash;
//         // 이제 `hashedPassword`를 데이터베이스에 저장하거나 필요한 곳에 사용할 수 있습니다.
//     }
// });

// ------------- ::: 로그인 | 회원가입 ::: ------------- //
// 로그인 페이지로 이동
app.get('/loginpage', (req, res) => {
    res.render('login/login');
});

app.get('/findid', (req, res) => {
    res.render('login/findid');
});

app.get('/findPwd', (req, res) => {
    res.render('login/findPwd');
});

app.get('/mypage', (req, res) => {
    res.render('login/mypage');
});

app.get('/OperatorsSignup', (req, res) => {
    res.render('login/OperatorsSignup');
});

app.get('/UserSingup', (req, res) => {
    res.render('login/UserSingup');
});

app.get('/signup', (req, res) => {
    res.render('login/signup');
});


// login.js에서 내보낸 함수를 호출하고, app 인스턴스를 인자로 전달
loginRoutes(app);

// 회원가입 페이지로 이동(유저/가맹점선택 버튼)
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

registerRoutes(app);

// 유저 회원가입 페이지 이동
app.get('/UserSignup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'UserSingup.html'));

    // res.send('회원가입이 성공하였습니다.'); // 또는 필요한 응답을 보낸 후
    // // redirectToLoginPage(); // JavaScript로 리디렉션 (클라이언트 측에서 로그인 페이지로 이동)
});

app.post('/UserSignup.html', (req, res) => {
    usersingRoutes(req, res); // usersingRoutes 모듈을 호출하여 회원가입 로직 실행
});

//회원가입 성공시 로그인페이지로 
app.post('/UserSignupSuccess', (req, res) => {
    res.redirect('/login'); // 로그인 페이지로 리디렉션
});


// 가맹점 회원가입 페이지 이동
app.get('/OperatorsSignup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'OperatorsSignup.html'))

})

registerRoutes(app);
//---------------------------------------------------//


// ------------- ::: 로그인 상태 유지  ::: ------------- //
// 로그인 확인 미들웨어
function ensureAuthenticated(req, res, next) {
    if (req.session.userID) {
        return next(); // 로그인이 되어 있다면, 다음 미들웨어 또는 라우터 핸들러로 이동
    } else {
        res.status(403).send('로그인이 필요합니다.'); // 로그인이 되어 있지 않다면, 에러 메시지 반환
    }
}

app.get('/checkLogin', (req, res) => {
    if(req.session.userID) {
        res.json({ loggedIn: true, userID: req.session.userID });
    } else {
        res.json({ loggedIn: false });
    }
});
//---------------------------------------------------//


// ------------- ::: 로  그  아  웃 ::: ------------- //
app.get('/logout', (req, res) => {
    req.session.destroy();
    // res.send('Logged out successfully.');
    res.redirect('/');  // 홈화면으로 리다이렉트
});
//---------------------------------------------------//


// ------------- ::: 유  저  정  보 ::: ------------- //
app.get('/getUserInfo', ensureAuthenticated, (req, res) => {
    const sql = "SELECT * FROM userTable WHERE userID = ?";
    db.query(sql, [req.session.userID], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.post('/updateUserInfo', ensureAuthenticated, (req, res) => {
    const { userName, birthday } = req.body;
    const sql = "UPDATE userTable SET userName = ?, birthday = ? WHERE userID = ?";
    db.query(sql, [userName, birthday, req.session.userID], (err, results) => {
        if (err) throw err;
        res.send('정보가 성공적으로 업데이트되었습니다.');
    });
});

//---------------------------------------------------//


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});