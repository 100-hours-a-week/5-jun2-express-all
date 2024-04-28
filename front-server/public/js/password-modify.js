const passwordInput = document.getElementById('pw');
const passwordCheckInput = document.getElementById('pw-check');

const passwordHelperText = document.getElementById('pw-helper');
const passwordCheckHelperText = document.getElementById('pw-check-helper');
const modifyButton = document.getElementById('modify-btn');

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}/;

// 안내 메시지 출력 함수
const writeHelperMessage = (helperText, message) => {
    helperText.innerText = message;
}

// 1) 비밀번호 유효성 검사
const validatePassword = () => {
    const password = passwordInput.value;
    let message = "";

    let isEmpty = (password == "");
    let isValidPattern = PASSWORD_PATTERN.test(password);

    if (isEmpty) {
        message = "* 비밀번호를 입력해주세요.";
    } else if (!isValidPattern) {
        message = "* 비밀번호는 8~20자이며, 대소문자 및 특수문자를 포함해야 합니다.";
    }
    if (isValidPattern) {
        message = "";
    }

    console.log(message);
    writeHelperMessage(passwordHelperText, message);
}

// 2) 비밀번호 확인 유효성 검사
const validatePasswordCheck = () => {
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;
    let message = "";

    let isEmpty = (passwordCheck == '');
    let isSame = (passwordCheck === password);
    let isValidPattern = PASSWORD_PATTERN.test(password);

    if (isEmpty) {
        message = "* 비밀번호를 한번 더 입력해주세요.";
    } else if (!isSame) {
        message = "* 비밀번호가 다릅니다.";
    }

    if (isValidPattern && isSame) {
        message = "";
    }
    writeHelperMessage(passwordCheckHelperText, message);
}
const activeModifyButton = () => {
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    let isSame = (password === passwordCheck);
    let isValid = PASSWORD_PATTERN.test(password);

    if (isSame && isValid) {
        modifyButton.disabled = false;
        modifyButton.style.backgroundColor = '#7F6AEE';
        modifyButton.style.cursor = 'pointer';
    } else {
        modifyButton.disabled = true;
        modifyButton.style.backgroundColor = '#ACA0EB';
        modifyButton.style.cursor = 'default';
    }
}

passwordInput.addEventListener('keyup', () => {
    activeModifyButton(), 
    validatePassword()
});
passwordCheckInput.addEventListener('keyup', () => {
    activeModifyButton(),
    validatePasswordCheck()
});