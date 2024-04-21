const boardRepository = require('../models/boardRepository');

// 게시글 등록
exports.registerBoard = async (req, res, next) => {
    const { title, content, imageUrl } = req.body;
    const board = { title, content, imageUrl };

    try {
        const findBoard = await boardRepository.save(board);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// 게시글 목록 조회
exports.findAllBoards = async (req, res, next) => {

}

// 게시글 상세 조회
exports.findByBoardId = async (req, res, next) => {
    
}

// 게시글 수정
exports.updateBoard = async (req, res, next) => {
    
}

// 게시글 삭제
exports.deleteBoard = async (req, res, next) => {
    
}