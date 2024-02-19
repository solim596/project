//모듈
const express = require('express'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const passwordToHash = 'your_password_here';
const cors = require("cors");
const xlsx = require('xlsx');

const path = require('path');
const app = express();
const port = 3000;


// 정적 파일 서비스 !!!! (views폴더) :
app.use(express.static('project'));
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('category'));

//라우팅

const page = require('./src/routes/page'); 
//const loginpage = require('./src/routes/login'); 
const login = require('./src/routes/login');

const category = require('./src/routes/category/category');

const usersignup = require('./src/routes/usersignup');
// usersignup(app);
const shopsign = require('./src/routes/shopsign');

const shopinfo = require('./src/routes/shopinfo');
const userinfo = require('./src/routes/userinfo');
// shopsign(app);

const boardL = require('./src/routes/boardL')
const boardW = require('./src/routes/boardW')

const workbook = xlsx.readFile('F:/P/delivery.xlsx');
const sheetName = workbook.SheetNames[0]; // Excel 시트 이름
const worksheet = workbook.Sheets[sheetName]; // 첫 번째 시트
const boardList = require('./src/routes/boardL');
const shopdata = require('./src/routes/shopinfo');

// 데이터 추출
const data = xlsx.utils.sheet_to_json(worksheet);

//앱세팅
app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());

//바디
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'project',
    cookie :{maxAge : 60000},
    resave: true,
    saveUninitialized: true,
    store: new FileStore(),
}));

//페이지 이동용

app.use('/', page); 
app.use('/category', category);

//로그인
app.use('/login', login)
app.use('/usersignup', usersignup);
app.use('/shopsign', shopsign);
app.use('getUserInfo', login)
app.use('checkLogin', login)

// 게시판
app.use('/boardW', boardW);
app.use('/boardL', boardL);
app.use('/boardList', boardL);

// 관리자
app.use('/shopinfo', shopinfo);
app.use('/userinfo', userinfo);

//app.use('/algo', algo);

// public 디렉터리에서 정적 파일을 제공합니다.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'project')));

const db = require('../project/src/db/db_connect');
// usersingRoutes(app);

const age_order = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];
data.forEach(row => {
    row['연령대'] = age_order.indexOf(row['연령대']);
});
data.sort((a, b) => a['연령대'] - b['연령대']);

// app.get('/age/:num', (req, res) => {
//     const { num } = req.params;
//     const age_group = determineAgeGroup(num);
    
//     if (age_group) {
//         const most_ordered_category = getMostOrderedCategory(data, age_group);
//         res.json({ 'age': most_ordered_category });
//     } else {
//         res.json({ 'age': '알수없음' });
//     }
// });

// function determineAgeGroup(num) {
//     if (num >= 0 && num < 20) {
//         return 1;
//     } else if (num < 30) {
//         return 1;
//     } else if (num < 40) {
//         return 2;
//     } else if (num < 50) {
//         return 3;
//     } else if (num < 60) {
//         return 4;
//     } else if (num >= 60) {
//         return 5;
//     } else {
//         return null;
//     }
// }

// function getMostOrderedCategory(data, age_group) {
//     const filtered_data = data.filter(row => row['연령대'] === age_group);
//     const counts = {};
    
//     filtered_data.forEach(row => {
//         const category = row['최다주문분류'];
//         counts[category] = (counts[category] || 0);
//     });
    
//     const mostOrderedCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
//     return mostOrderedCategory;
// }


//-----------추            천-------------------//


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});