
const express = require("express");
const router = express.Router();

// 예시용 더미 데이터
const dummyData = [
  {
    id: "1",
    title: "나이키 에어포스 1",
    price: 89000,
    discountRate: 15,
    image: "https://via.placeholder.com/150",
    link: "https://example.com/product/1",
  },
  {
    id: "2",
    title: "아디다스 울트라부스트",
    price: 119000,
    discountRate: 25,
    image: "https://via.placeholder.com/150",
    link: "https://example.com/product/2",
  },
];

router.get("/", (req, res) => {
  const query = req.query.query?.toLowerCase() || "";
  const results = dummyData.filter((item) =>
    item.title.toLowerCase().includes(query)
  );
  res.json(results);
});

module.exports = router;
