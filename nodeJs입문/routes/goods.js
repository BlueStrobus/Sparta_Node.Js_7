// /routes/goods.js
import express from 'express';

// Express.js의 라우터를 생성합니다.
const router = express.Router();

const goods = [
  {
    goodsId: 1,
    name: '상품 1',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg',
    category: 'drink',
    price: 6.2,
  },
  {
    goodsId: 2,
    name: '상품 2',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg',
    category: 'drink',
    price: 0.11,
  },
  {
    goodsId: 3,
    name: '상품 3',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg',
    category: 'drink',
    price: 2.2,
  },
  {
    goodsId: 4,
    name: '상품 4',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg',
    category: 'drink',
    price: 0.1,
  },
];

/** 상품 목록 조회 **/
// localhost:3000/api/goods GET
router.get('/goods', (req, res) => {
  return res.json({ goods: goods });
});


/* 상품 상세 조회API 
http://localhost:3000/api/goods/:goodsId/ */
router.get('/goods/:goodsId', (req, res) => {
  // 1. 상품의 id 조회
  // 2. 상품 id와 일치하는 데이터 찾기
  // 3. 조회한 상품 정보르 Response로 Return 한다.

  const goodsId = req.params.goodsId;  // 1.
  const findGoods = goods.find((oneGoods) =>oneGoods.goodsId === +goodsId) // 2.
  return res.status(200).json({goods: findGoods}); // 3.
})

/** 상품 등록 리팩토링 **/
// localhost:3000/api/goods POST
router.post('/goods', (req, res) => {
  // 객체 구조 분해 할당 적용하기.
  const { name, thumbnailUrl, category, price } = req.body;

  const goodsId = goods[goods.length - 1].goodsId + 1; // 현재 goodsId의 가장 큰 값 + 1

  // 객체 구조 분해 할당 적용하기.
  const goodsItem = {
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  };
  goods.push(goodsItem);

  return res.status(201).json({ goods: goodsItem });
});

export default router;
