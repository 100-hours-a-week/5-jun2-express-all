const userRepository = require('../models/userRepository');

// 응답 메시지 
const getResponseMessage = (message, data) => {
    const response = {
        message, 
        data
    };
    return response;
}

// 무작위 문자열 생성 -> 이후 인증할 때 수정
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// 인자값 유효성 검사
const validateRequest = (req) => {
    for (const key in req) {
        if (req.hasOwnProperty(key)) {
            // 만약 값이 null 또는 undefined라면 에러 발생
            if (req[key] === null || req[key] === undefined) {
                throw new Error('invalid_request');
            }
        }
    }
}

// 회원가입
exports.signupUser = async (req, res, next) => {
    try {
        const { profileUrl, email, password, nickname, createdAt } = req.body;
        const user = { profileUrl, email, password, nickname, createdAt };

        // 요청 값이 비어있는지 확인
        validateRequest(user);

        const findUser = await userRepository.save(user);
        const response = getResponseMessage('signup_success', findUser);

        console.log(response);

        return res.status(200).json(response);
    } catch (error) {
        if (error.message === 'invalid_request') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'email_exist' || error.message === 'nickname_exist') {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: 'interval_server_error' });
    }
}

// 로그인
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = { email, password };

        validate(user);

        const findUser = await userRepository.findUserByEmailAndPassword(userData);

        // 인증 로직 대신 랜덤 토큰 부여
        const randomToken = generateRandomString(Math.floor(Math.random() * 11) + 40);
        findUser.token = randomToken;

        const response = getResponseMessage('login_success', findUser);

        // 데이터 출력
        console.log(response);

        return res.status(200).json(response);
    } catch (error) {
        if (error.message === 'invalid_request') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'user_not_found') {
            return res.status(404).json({ message: error.message });
        } 
        return res.status(500).json({ message: 'internal_server_error' });
    }
}

// 로그아웃
exports.logoutUser = async (req, res, next) => {

}

// 회원 정보 수정
exports.updateUser = async (req, res, next) => {
    
}

// 비밀번호 수정
exports.updatePassword = async (req, res, next) => {
    
}

// 회원 탈퇴
exports.deleteUser = async (req, res, next) => {
    
}

exports.findUserById = async (req, res, next) => {
    const userId = req.params.id;
    const user = userRepository.findById(userId);
    console.log(user);
    res.json(`User : ${user}`);
}
