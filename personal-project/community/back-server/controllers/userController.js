const userRepository = require('../models/userRepository');

// 회원가입
exports.signupUser = async (req, res, next) => {
    const { profileUrl, email, password, nickname} = req.body;
    const user = { profileUrl, email, password, nickname };

    try {
        const findUser = await userRepository.save(user);
        return res.json(findUser.id);
    } catch (error) {
        return res.status(500).json(error);
    }
}