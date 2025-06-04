const express = require("express");
const router = express.Router();

// 예시 리뷰 데이터
const reviews = [
  {
    _id: "rev1",
    image: "https://via.placeholder.com/300x200",
    caption: "이 신발 너무 편해요!",
    likes: 23,
  },
  {
    _id: "rev2",
    image: "https://via.placeholder.com/300x200",
    caption: "디자인도 이쁘고 착화감도 좋아요.",
    likes: 35,
  },
  {
    _id: "rev3",
    image: "https://via.placeholder.com/300x200",
    caption: "가성비 갑! 추천합니다.",
    likes: 17,
  },
];

// 좋아요 순으로 정렬하여 상위 5개 반환
router.get("/top-liked", (req, res) => {
  const topLiked = reviews
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  res.json(topLiked);
});

module.exports = router;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "dev-secret";

// 메모리 기반 리뷰 목록
const reviews = [
  {
    _id: "rev1",
    image: "https://via.placeholder.com/300x200",
    caption: "이 신발 너무 편해요!",
    likes: 23,
  },
  {
    _id: "rev2",
    image: "https://via.placeholder.com/300x200",
    caption: "디자인도 이쁘고 착화감도 좋아요.",
    likes: 35,
  },
  {
    _id: "rev3",
    image: "https://via.placeholder.com/300x200",
    caption: "가성비 갑! 추천합니다.",
    likes: 17,
  },
];

// 인증 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 좋아요 많은 순 조회
router.get("/top-liked", (req, res) => {
  const topLiked = reviews
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);
  res.json(topLiked);
});

// 리뷰 등록 (인증 필요)
router.post("/", authenticateToken, (req, res) => {
  const { image, caption } = req.body;
  const newReview = {
    _id: "rev" + (reviews.length + 1),
    image,
    caption,
    likes: 0,
    user: req.user.email,
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// 리뷰 삭제 (인증 + 본인만 가능)
router.delete("/:id", authenticateToken, (req, res) => {
  const index = reviews.findIndex((r) => r._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "리뷰 없음" });

  const review = reviews[index];
  if (review.user !== req.user.email) {
    return res.status(403).json({ message: "본인 리뷰만 삭제 가능" });
  }

  reviews.splice(index, 1);
  res.json({ message: "삭제 완료" });
});