const userRepository = require('../models/userRepository');

exports.requireAuth = (req, res, next) => {
    const session = req.session;

    console.log("=== request header ===");
    console.log(session);
    console.log(session.user);

    // 인증되지 않은 유저
    if (!session.user) {
        return res.status(401).json({ message: '로그인이 필요한 서비스입니다.' });
    }

    next();
}