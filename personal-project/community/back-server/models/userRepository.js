const users = [];
let id = 0;

exports.save = async (req) => {
    const userId = ++id;
    const user = {
        id: userId,
        profileUrl : req.profileUrl,
        email: req.email,
        password: req.password,
        nickname: req.nickname
    }
    users.push(user);

    // 확인 용도
    this.findAll();

    return user;
}

exports.findAll = () => {
    console.log(users);
    return users;
}

exports.findByEmail = (email) => {
    try {
        const user = users.some(user => user.email === email);
        return user;
    } catch (error) {

    }
}