const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(express.json());

// ✅ 개발용: 실제 사용하는 오리진들을 모두 명시
const whitelist = [
    'http://localhost:3000',
    'http://172.16.209.74:3000',
    'https://chacha.newbie.sparcsandbox.com',
];

// ✅ credentials:true이면 origin을 *로 못 씀 → 콜백으로 필터링
const corsOptions = {
    origin: (origin, callback) => {
        console.log('[CORS] Request from:', origin);
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ CORS 미들웨어 최상단
app.use(cors(corsOptions));

// ✅ (선택) 사전 요청 빠르게 허용
app.options('*', cors(corsOptions));

// ------ 라우터들 ------
app.use('/', require('./routes/Home.js'));
app.use('/posts', require('./routes/Post.js'));
app.use('/login', require('./routes/LogIn.js'));
app.use('/register', require('./routes/Register.js'));
app.use('/goal', require('./routes/Goal.js'));
app.use('/food', require('./routes/Food.js'));
app.use('/schedule', require('./routes/Schedule.js'));
app.use('/consume', require('./routes/Consume.js'));
app.use('/diary', require('./routes/Diary.js'));

// ✅ 헤더는 send 전에 설정
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://172.16.209.74:3000');
    res.send('Server chacha');
});

// ✅ 외부에서 접속 가능하게 명시
app.listen(port, '0.0.0.0', () => {
    console.log(`Running Server on 0.0.0.0:${port}`);
});
