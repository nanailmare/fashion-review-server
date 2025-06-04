
const express = require("express");
const router = express.Router();

// 예시용 구매 데이터
const purchases = [
  { brand: "나이키" },
  { brand: "아디다스" },
  { brand: "나이키" },
  { brand: "무신사" },
  { brand: "나이키" },
  { brand: "뉴발란스" },
  { brand: "아디다스" },
  { brand: "나이키" },
  { brand: "무신사" },
];

// 브랜드별 구매 횟수 집계
router.get("/brands", (req, res) => {
  const counts = {};
  purchases.forEach((p) => {
    counts[p.brand] = (counts[p.brand] || 0) + 1;
  });

  const result = Object.entries(counts).map(([brand, count]) => ({
    brand,
    count,
  }));

  res.json(result);
});

module.exports = router;
