// 실제론 DB와 연결해야 함
const users = [];
let id = 0;

// 이메일 중복 검사
const isDuplicatedEmail = (email) => {
    return users.some(user => user['email'] == email);
}

// 닉네임 중복 검사
const isDuplicatedNickname = (nickname) => {
    return users.some(user => user['nickname'] == nickname);
}

const validateUser = (req) => {
    if (isDuplicatedEmail(req.email)) {
        throw new Error('email_exist');
    }
    if (isDuplicatedNickname(req.nickname)) {
        throw new Error('nickname_exist');
    }
    return true;
}

// 회원가입
exports.save = async (req) => {
    try {
        const isValidUser = validateUser(req);
        if (!isValidUser) {
            throw new Error('Invalid user');
        }

        const userId = ++id;
        const user = {
            'user_id': userId,
            'profile_url': req.profileUrl,
            'email': req.email,
            'password': req.password,
            'nickname': req.nickname,
            'created_at': req.createdAt
        }
        users.push(user);
        return user;
    } catch (error) {
        throw error;
    }
}

// 로그인
exports.findUserByEmailAndPassword = async (req) => {
    return new Promise((resolve, reject) => {
        const findUser = users.find(user => user.email === req['email'] && user['password'] === req.password);

        if (findUser) {
            const loginInfo = {
                'user_id': findUser.user_id,
                'email': findUser.email,
                'nickname': findUser.nickname 
            }
            resolve(loginInfo);
        } else {
            throw new Error('user_not_found');
        }  
    });
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

// 이메일로 유저 정보 
exports.findByEmail = (email) => {
    const findUser = users.find(user => user["email" == email]);
    return findUser;
}

exports.findByNickname = (nickname) => {
    const findUser = users.find(user => user["nickname" == nickname]);
    return findUser;
}