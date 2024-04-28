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

// 생성 날짜
const getCreatedDate = () => {
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

// 회원가입
exports.signupUser = async (req, res, next) => {
    try {
        const { profileUrl, email, password, nickname } = req.body;
        const createdAt = getCreatedDate();
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

const authData = {
    email: 'wnstj@naver.com',
    password: '111111',
    nickname: 'jun'
}

// 로그인
exports.loginUser = (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = { email, password };

        validateRequest(userData);

        if (req.session.user) {
            console.log(req.session.user);
            return res.status(200).json({ message: 'already_logined' });
        } else {
            const findUser = userRepository.findUserByEmailAndPassword(userData);
            if (!findUser) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
    
            // 세션에 사용자 정보를 저장합니다.
            req.session.user = {
                id: findUser.user_id,
                email: findUser.email,
                authorized: true
            };
            res.cookie('session_id', req.sessionID, {
                maxAge: 10000,
                httpOnly: false
            });
            console.log(req.session);

            return res.status(200).json({ message: 'login_success' });
        }
    } catch (error) {
        if (error.message === 'invalid_request') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'user_not_found') {
            return res.status(404).json({ message: error.message });
        } 
        return res.status(500).json({ message: error.message });
    }
}

// 로그아웃
exports.logoutUser = (req, res, next) => {
    console.log("=== status ===");
    console.log(req.session);
    if (req.session.user) {
        req.session.destroy();
        res.clearCookie('session_id');

        return res.status(200).json({ message: 'logout_success'});
    } else {
        console.log("no logined user");
    }
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
