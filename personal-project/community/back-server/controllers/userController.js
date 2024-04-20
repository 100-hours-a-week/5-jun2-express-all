const userRepository = require('../models/userRepository');

// 응답 메시지 
const getResponseMessage = async (message, data) => {
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
    console.log('유저 회원가입!');

    const { profileUrl, email, password, nickname, createdAt } = req.body;
    const user = { profileUrl, email, password, nickname, createdAt };

    try {
        const findUser = await userRepository.save(user);
        const response = await getResponseMessage('signup_success', findUser);

        console.log(findUser);

        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// 로그인
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const userData = { email, password };

    try {
        const findUser = await userRepository.findUserByEmailAndPassword(userData);

        // 인증 로직 들어가야 함
        const randomToken = generateRandomString(Math.floor(Math.random() * 11) + 40);
        findUser.token = randomToken;

        const response = await getResponseMessage('login_success', findUser);
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
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
