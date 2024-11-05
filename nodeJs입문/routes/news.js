// routes/news.js


import express from 'express';

const router = express.Router();

/** 뉴스 목록 조회 API **/
// 3. HTTP Method와 URL을 지정한 API를 정의합니다.
// 만약, localhost:3000/api/news 라는 URL로 GET 요청이 들어온다면 해당 코드를 실행합니다.
router.get('/news', (req, res) => {
  // 4. 사용자의 요청에 맞는 데이터를 반환합니다.
  return res // Express.js의 res 객체를 반환합니다.
    .status(200) // API의 상태 코드를 200번으로 전달합니다.
    .send('뉴스 목록 조회 API 입니다.'); // API의 결과값을 '뉴스 목록 조회 API 입니다.'로 전달합니다.
});

/** 뉴스 세부 조회 API **/
// 3. HTTP Method와 URL을 지정한 API를 정의합니다.
// 만약, localhost:3000/api/news/:newsId 라는 URL로 GET 요청이 들어온다면 해당 코드를 실행합니다.
router.get('/news/:newsId', (req, res) => {
  // 클라이언트가 전달한 Path Params 데이터를 받아옵니다.
  const params = req.params;

  // Path Params 데이터 중 newsId를 추출합니다.
  const newsId = params.newsId;

  // 서버 콘솔에 클라이언트가 전달한 newsId를 출력합니다.
  console.log('클라이언트로 부터 전달받은 뉴스 ID:', newsId);

  // 4. 사용자의 요청에 맞는 데이터를 json 형태로 반환합니다.
  return res.status(200).json({
    data: '뉴스 세부 조회 API 입니다.',
  });
});

// Express 라우터를 외부로 전달합니다.
export default router;