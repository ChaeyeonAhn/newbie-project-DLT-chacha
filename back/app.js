const express = require('express');
const cors = require('cors'); 

require('dotenv').config();

const app = express();
const port = 8080;

app.use(express.json()); /* Parsing */
 
const whitelist = ['http://localhost:3000']; 

const corsOptions = {
  /* 요청의 출처 (origin) 가 화이트 리스트에 있는지 확인. */
    origin: (origin, callback) => { 
        console.log('[CORS] Request from : ', origin);

        if (!origin || whitelist.indexOf(origin) !== -1) {
          /* 만약 인증이 통과 되면, callback 함수의 오른쪽 부분에 true 를 반환해야 함.
          만약 에러가 난다면, 왼쪽 부분에 에러 값을 넣어야 함. */
          callback(null, true);
        }
        /* 화이트 리스트에서 요청의 출처가 나타나는 인덱스를 찾는데, 화이트 리스트 배열에 출처가 보이지 않으면 -1 을 반환.
           출처가 화이트 리스트에 있다면 -1 을 반환하지 않음. */
        else callback(new Error('Not Allowed by CORS'), false);  
    },
    /* 인증 정보를 요청과 함께 전송. */
    credentials: true, 
}

/* 미들웨어, 처리한 값을 다음 단계로 넘겨준다. */
app.use(cors(corsOptions)); 

let POSTS = [
  { id: 1, date: '2024.05.09', goal: 'First Goal'}
];

app.get('/', (req, res) => {
  res.send('Server chacha');
});

app.get('/posts', (req, res) => {
  res.json(POSTS);
});

app.post('/posts', (req, res) => {
  const { date, goal } = req.body;
  const addPost = {
    id: POSTS.length + 1,
    date: title,
    goal: goal
  };
  POSTS.push(addPost);
  return res.status(200).json({ isOk: true });
})

app.listen(port, () => {
  console.log(`Running Server: http://localhost:${port}`);
});


