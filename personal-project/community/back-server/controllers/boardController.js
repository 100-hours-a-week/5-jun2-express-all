const boardRepository = require('../models/boardRepository');

/* 1) 공통 로직 */

// 응답 메시지 
const getResponseMessage = (message, data) => {
    const response = {
        message, 
        data
    };
    return response;
}

// 인자값 유효성 검사
const validateRequest = (req) => {
    for (const key in req) {
        if (req.hasOwnProperty(key)) {
            if (req[key] === null || req[key] === undefined) {
                throw new Error('invalid_request');
            }
        }
    }
}

/* 2) 주요 로직 */

// 게시글 등록
exports.registerBoard = async (req, res, next) => {
    try {
        const { title, content, imageUrl } = req.body;
        const board = { title, content, imageUrl };

        validateRequest(board);

        console.log(board);

        const findBoard = await boardRepository.save(board);
        const response = getResponseMessage('signup_success', findBoard);

        return res.status(201).json(response);
    } catch (error) {
        if (error.message == 'invalid_request') {
            return res.status(400).json({ message: error.messgae });
        }

        // 인증되지 않은 사용자 요청인 경우 : 401
        // 권한이 없는 사용자 요청인 경우 : 403
        // 존재하지 않은 사용자 요청인 경우 : 404
        
        return res.status(500).json({ message: error.messsage });
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