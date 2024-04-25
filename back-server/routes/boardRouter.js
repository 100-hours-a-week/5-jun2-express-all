const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const today = new Date(); // 현재시간
        const year = today.getFullYear(); // 년 (yyyy)
        const month = today.getMonth() + 1; // 월 (MM)
        const date = today.getDate(); // 일 (dd)
        const hours = today.getHours(); // 시 (hh)
        const minutes = today.getMinutes(); // 분 (mm)
        const seconds = today.getSeconds(); // 초 (ss)
        const milliseconds = today.getMilliseconds(); // 밀리초 (fff)

        // 현재시간으로 파일 이름 설정
        const now = year+"-"+month+"-"+date+"-T"+hours+"-"+minutes+"-"+seconds+"-"+milliseconds;
        const extension = path.extname(file.originalname);
        const filename = `${now}${extension}`;
        cb(null, filename);
    }
});

const upload  = multer({
    storage: storage
});

const boardController = require('../controllers/boardController');

// 게시글 등록
router.post("/", upload.single('image'), boardController.registerBoardWithImage);

// 게시글 목록 조회
router.get("/", boardController.findAllBoards);

// 게시글 상세 조회
router.get("/:boardId", boardController.findByBoardId);

// 게시글 수정
router.post("/:boardId", boardController.updateBoard);

// 게시글 삭제
router.delete("/:boardId", boardController.deleteBoard);

// 댓글 등록
router.post("/:boardId/comments", boardController.registerComment);

// 댓글 수정
router.post("/:boardId/comments/:commentId", boardController.updateComment);

// 댓글 삭제
router.delete("/:boardId/comments/:commentId", boardController.deleteComment);

module.exports = router;