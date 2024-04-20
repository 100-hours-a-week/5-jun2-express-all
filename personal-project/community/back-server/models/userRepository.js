const users = [];
let id = 0;

// 회원가입
exports.save = async (req) => {
    const userId = ++id;
    const user = {
        'user_id': userId,
        'profile_url' : req.profileUrl,
        'email': req.email,
        'password': req.password,
        'nickname': req.nickname,
        'created_at': req.createdAt
    }
    users.push(user);

    // 확인 용도
    //this.findAll();

    return user;
}

// 로그인
exports.findUserByEmailAndPassword = async (req) => {
    const findUser = await users.find(user => user.email === req.email && user.password === req.password);
    const loginInfo = {
        'user_id': findUser.user_id,
        'email': findUser.email,
        'nickname': findUser.nickname 
    }
    return loginInfo;
}

// 로그아웃

// 회원 정보 수정

// 비밀번호 수정

// 회원 탈퇴

// 모든 유저 정보
exports.findAll = () => {
    console.log(users);
    return users;
}

// 고유 아이디로 유저 정보 
exports.findById = (id) => {
    const findUser = users.find(user => user["user_id"] == id);
    return findUser;
}