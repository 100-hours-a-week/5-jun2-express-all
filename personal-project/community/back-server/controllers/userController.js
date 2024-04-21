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

// 회원가입
exports.signupUser = async (req, res, next) => {
    const { profileUrl, email, password, nickname, createdAt } = req.body;
    const user = { profileUrl, email, password, nickname, createdAt };

    try {
        const findUser = await userRepository.save(user);
        const response = getResponseMessage('signup_success', findUser);

        console.log(response);

        return res.json(response);
    } catch (error) {
        if (error.message === 'email_exist' || error.message === 'nickname_exist') {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: 'interval_server_error' });
    }
}

// 로그인
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const userData = { email, password };

    try {
        const findUser = await userRepository.findUserByEmailAndPassword(userData);

        // 인증 로직 대신 랜덤 토큰 부여
        const randomToken = generateRandomString(Math.floor(Math.random() * 11) + 40);
        findUser.token = randomToken;

        const response = getResponseMessage('login_success', findUser);

        console.log(response);
        return res.json(response);
    } catch (error) {
        if (error.message === 'user_not_found') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'invalid_request') {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'interval_server_error' });
        }
    }
}

// 로그아웃

// 회원 정보 수정

// 비밀번호 수정

// 회원 탈퇴

exports.findUserById = async (req, res, next) => {
    const userId = req.params.id;
    const user = userRepository.findById(userId);
    console.log(user);
    res.json(`User : ${user}`);
}
