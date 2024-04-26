// 실제론 DB와 연결해야 함
const users = [
    {
        "user_id" : 1,
        "email" : "juntwo@naver.com",
        "password" : "Qwer123!",
        "nickname" : "juntwo",
        "created_at" : "2024-04-18T13:27:33"
    },
    {
        "user_id" : 2,
        "email" : "void@google.com",
        "password" : "Qwer123!",
        "nickname" : "void",
        "created_at" : "2024-04-15T11:34:10"
    },
    {
        "user_id" : 3,
        "email" : "jeff@google.com",
        "password" : "Qwer123!",
        "nickname" : "jeff",
        "created_at" : "2024-03-06T20:09:12"
    },
    {
        "user_id" : 4,
        "email" : "chen@naver.com",
        "password" : "Qwer123!",
        "nickname" : "chen",
        "created_at" : "2024-02-21T06:13:04"
    },
    {
        "user_id" : 5,
        "email" : "junone@naver.com",
        "password" : "Qwer123!",
        "nickname" : "junone",
        "created_at" : "2024-02-20T10:41:28"
    },
    {
        "user_id" : 6,
        "email" : "judy@naver.com",
        "password" : "Qwer123!",
        "nickname" : "judy",
        "created_at" : "2024-01-14T22:17:35"
    }
];
let id = 6;

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
exports.findUserByEmailAndPassword = (req) => {
    const findUser = users.filter(user => user.email == req.email && user.password == req.password);
    if (findUser) {
        const loginInfo = {
            'user_id': findUser[0].user_id,
            'email': findUser[0].email,
            'nickname': findUser[0].nickname 
        }
        return loginInfo;
    } else {
        throw new Error('user_not_found');
    }  
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