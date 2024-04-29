const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profiles/');
    },
    filename: (req, file, cb) => {
        // 유저 닉네임으로 파일 이름 설정
        const nickname = req.body.nickname;
        const extension = path.extname(file.originalname);
        const filename = `${nickname}${extension}`;
        cb(null, filename);
        console.log("profile saved!@!");
    }
})

const upload = multer({
    storage: storage
});

const userController = require('../controllers/userController');

// 회원가입
router.post("/signup", upload.single('profile'), userController.signupUser);

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