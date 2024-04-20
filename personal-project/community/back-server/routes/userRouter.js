const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// 회원가입
router.post("/signup", userController.signupUser);

// 로그인
router.post("/login", userController.loginUser);

// 로그아웃

// 회원 정보 수정

// 비밀번호 수정

// 회원 탈퇴

router.get("/:id", userController.findUserById);

router.delete("/", (req, res, next) => {
    res.json({"message" : "DELETE request to the test page"});
})

module.exports = router;