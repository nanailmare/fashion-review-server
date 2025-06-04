
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const SECRET_KEY = "dev-secret"; // 개발용 비밀키
const users = []; // 메모리 기반 사용자 저장

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  res.status(201).json({ message: "회원가입 완료" });
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
