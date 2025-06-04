
const express = require("express");
const cors = require("cors");

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우터 연결
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
const reviewsRouter = require("./routes/reviews");
app.use("/api/reviews", reviewsRouter);
const purchasesRouter = require("./routes/purchases");
app.use("/api/purchases", purchasesRouter);
const searchRouter = require("./routes/search");
app.use("/api/search", searchRouter);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Fashion API 서버가 실행 중입니다.");
});

module.exports = app;
