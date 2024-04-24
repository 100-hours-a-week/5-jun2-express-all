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

// 생성 날짜
const getNowDate = () => {
    const createdAt = new Date();

    const year = createdAt.getFullYear();
    const month = ('0' + (createdAt.getMonth() + 1)).slice(-2);
    const day = ('0' + createdAt.getDate()).slice(-2);

    const dateString = year + '-' + month  + '-' + day;

    const hours = ('0' + createdAt.getHours()).slice(-2); 
    const minutes = ('0' + createdAt.getMinutes()).slice(-2);
    const seconds = ('0' + createdAt.getSeconds()).slice(-2); 

    const timeString = hours + ':' + minutes  + ':' + seconds;

    return dateString + ' ' + timeString;
}

/* 2) 게시판 로직 */

// 게시글 등록
exports.registerBoard = async (req, res, next) => {
    try {
        const { title, content, image_url } = req.body;
        const created_at = getNowDate();
        const updated_at = getNowDate();
        const board = { title, content, image_url, created_at, updated_at };

        validateRequest(board);

        console.log(board);

        const findBoard = await boardRepository.save(board);
        const response = getResponseMessage('register_success', findBoard);

        // console.log("=== 모든 게시글 조회 ===");
        // console.log(boardRepository.findAll());
        // console.log("=== 게시글 조회 끝 ===\n");
        
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
    try {
        const boards = boardRepository.findAll();
        const response = getResponseMessage('success', boards);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

// 게시글 상세 조회
exports.findByBoardId = async (req, res, next) => {
    try {   
        const boardId = req.params.boardId;

        const findBoard = boardRepository.findById(boardId);

        const response = getResponseMessage('success', findBoard);
        return res.status(200).json(response);
    } catch (error) {
        if (error.message == 'invalid_request') {
            return res.status(400).json({ 'message': error.message });
        }
        if (error.message == 'board_not_exist') {
            return res.status(404).json({ 'message': error.message });
        }
        return res.status(500).json({ 'message': error.message });
    }
}

// 게시글 수정
exports.updateBoard = async (req, res, next) => {
    try {
        const board_id = req.params.boardId;
        const { title, content, image_url } = req.body;
        const newBoardData = { board_id, title, content, image_url };

        const updatedBoard = boardRepository.updateBoard(newBoardData);
        const response = getResponseMessage('update_success', updatedBoard);

        return res.status(200).json(response);

    } catch (error) {
        // 유효하지 않은 요청인 경우 : 400
        // 인증되지 않은 사용자 요청인 경우 : 401
        // 권한이 없는 사용자 요청인 경우 : 403

        if (error.message == 'board_not_exist') {
            return res.status(404).json({ 'message': error.message });
        }
        return res.status(500).json({ 'message': error.message });
    }
    
}

// 게시글 삭제
exports.deleteBoard = async (req, res, next) => {
    try {
        const board_id = req.params.boardId;

        boardRepository.deleteById(board_id);

        return res.status(200).json({ 'message': 'delete_success' });

    } catch (error) {
        // 유효하지 않은 요청인 경우 : 400
        // 인증되지 않은 사용자 요청인 경우 : 401
        // 권한이 없는 사용자 요청인 경우 : 403

        if (error.message == 'board_not_exist') {
            return res.status(404).json({ 'message': error.message });
        }
        return res.status(500).json({ 'message': error.message });
    }
}

// 3) 댓글 로직
// 댓글 등록
exports.registerComment = async (req, res, next) => {
    try {
        const board_id = req.params.boardId;
        const comment = req.body.comment;
        const created_at = getNowDate();

        const commentData = boardRepository.saveComment(board_id, comment, getNowDate);
        const response = getResponseMessage('register_success', commentData);

        return res.status(200).json(response);

    } catch (error) {
        // 유효하지 않은 요청인 경우 : 400
        // 인증되지 않은 사용자 요청인 경우 : 401
        // 권한이 없는 사용자 요청인 경우 : 403

        if (error.message == 'board_not_exist') {
            return res.status(404).json({ 'message': error.message });
        }
        return res.status(500).json({ 'message': error.message });
    }
}

// 댓글 수정
exports.updateComment = async (req, res, next) => {

}

// 댓글 삭제
exports.deleteComment = async (req, res, next) => {

}
