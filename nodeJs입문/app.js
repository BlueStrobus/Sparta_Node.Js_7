// app.js

import express from 'express';
import goodsRouter from './routes/goods.js';
import newsRouter from './routes/news.js';

const app = express();
const PORT = 3000;

// Express에서 req.body에 접근하여, body 데이터를 사용할 수 있도록 설정하는 미들웨어

// json 형태로 서버에 body 데이터를 전달하면, req.body에 데이터를 변환하여 넣어줍니다.
// API 클라이언트를 사용 할 때 사용
app.use(express.json());

// form content type에서 body 데이터를 전달하면, req.body에 데이터를 변환하여 넣어줍니다.
// 프론트엔드 동료와 협업시 사용
app.use(express.urlencoded({ extended: true }));


// localhost:3000/api -> goodsRouter, newsRouter
app.use('/api', [goodsRouter, newsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});