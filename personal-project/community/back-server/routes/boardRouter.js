const express = require('express');
const router = express.Router();

const boardController = require('../controllers/boardController');

// 게시글 등록
router.post("/", boardController.registerBoard);

// 게시글 목록 조회
router.get("/", boardController.findAllBoards);

// 게시글 상세 조회
router.get("/:boardId", boardController.findByBoardId);

// 게시글 수정
router.post("/:boardId", boardController.updateBoard);

// 게시글 삭제
router.delete("/:boardId", boardController.deleteBoard);

// 댓글 등록
router.post("/:boardId/comments". boardController.registerComment);

// 댓글 수정
router.post("/:boardId/comments/:commentId". boardController.updateComment);

// 댓글 삭제
router.delete("/:boardId/comments/:commentId". boardController.deleteComment);

module.exports = router;