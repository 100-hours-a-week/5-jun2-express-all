const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// 회원가입
router.post("/signup", userController.signupUser);

// 로그인
router.post("/login", userController.loginUser);

// 로그아웃
router.post("/logout", userController.logoutUser);

// 회원 정보 수정
router.post("/users/me", userController.updateUser);

// 비밀번호 수정
router.post("/users/password", userController.updatePassword);

// 회원 탈퇴
router.delete("/users/me", userController.deleteUser);

module.exports = router;