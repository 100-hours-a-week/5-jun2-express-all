// TO-DO : 닉네임 중복 검사

const nicknameInput = document.getElementById('nickname-input');
const nicknameHelper = document.getElementById('nickname-helper');
const modifyButton = document.getElementById('modify-btn');
const userDeleteButton = document.getElementById('user-delete-btn');

const NICKNAME_PATTERN = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

const userDataURL = '/resource/data/user-data.json';

const isEmpty = (nickname) => {
    return nickname == '';
}

async function isDuplicated(nickname) {
    const response = await fetch(userDataURL);
    const users = await response.json();
    const result = users.some(user => user.nickname === nickname);
    console.log(result);
    return result;
}

const isOverLength = (nickname) => {
    return nickname.length >= 11;
}

const writeHelperText = (message) => {
    nicknameHelper.innerText = message;
}

async function validateNicknameInput() {
    const nickname = nicknameInput.value;
    let message = "";

    console.log(nickname);

    if (isEmpty(nickname)) {
        message = "* 닉네임을 입력해주세요.";
    } else if (await isDuplicated(nickname)) {
        message = "* 중복된 닉네임 입니다.";
    } else if (isOverLength(nickname)) {
        message = "* 닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if (!NICKNAME_PATTERN.test(nickname)) {
        message = "* 유효한 닉네임 형식이 아닙니다.";
    } 
    if (NICKNAME_PATTERN.test(nickname) && !isDuplicated(nickname)){
        message = "";
    }

    writeHelperText(message);

    if (NICKNAME_PATTERN.test(nickname) && await isDuplicated(nickname) == false) {
        modifyButton.disabled = false;
        modifyButton.style.cursor = 'pointer';
        modifyButton.style.backgroundColor = '#9584e7';
    } else {
        modifyButton.disabled = true;
        modifyButton.style.backgroundColor = '#ACA0EB';
        modifyButton.style.cursor = 'default';
    }
}

nicknameInput.addEventListener('keyup', validateNicknameInput);
modifyButton.addEventListener('click', () => {
    alert('수정 완료');
});
userDeleteButton.addEventListener('click', () => {
    result = confirm('회원 탈퇴 하시겠습니까?');

    if (result == true) {
        window.location.href = '/login';
    }
});