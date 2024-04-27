const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pw');
const emailHelperText = document.getElementById('email-helper');
const passwordHelperText = document.getElementById('pw-helper');
const loginButton = document.getElementById('login-btn');

// 조건
const MIN_EMAIL_LENGTH = 8;
const EMAIL_PATTERN = /^[a-zA-Z_\.\-]+@[a-zA-Z0-9\-]+\.[A-za-z0-9\-]+/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}/;

/*
 * 이메일 유효성 검사
 * 1. 이메일이 너무 짧은 경우
 * 2. 입력하지 않은 경우
 * 3. 유효한 형식이 아닌 경우
 */
const validateEmailPattern = (email) => {
    const length = email.length;

    if (length < MIN_EMAIL_LENGTH || length == 0) {
        return false;
    } else {
        return EMAIL_PATTERN.test(email);
    }
}

const validateEmail = () => {
    const email = emailInput.value;
    const isValidEmail = validateEmailPattern(email);
    const isEmpty = (email.length == 0);

    if (isEmpty) {
        emailHelperText.innerText = '* 이메일을 입력해주세요.';
    } else if (isValidEmail === false) {
        emailHelperText.innerText = '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
    } else {
        emailHelperText.innerText = "";
    }
}

/*
 * 비밀번호 유효성 검사
 * 1. 입력하지 않은 경우
 * 2. 유효한 형식이 아닌 경우 (영문, 숫자 조합 8자리 이상)
 */
const validatePasswordPattern = (password) => {
    return PASSWORD_PATTERN.test(password);
}

const validatePassword = () => {
    const password = passwordInput.value;
    const isValidPassword = validatePasswordPattern(password);
    const isEmpty = (password.length == 0);


    if (isEmpty) {
        passwordHelperText.innerText = '* 비밀번호를 입력해주세요.';
    } else if (isValidPassword === false) {
        passwordHelperText.innerHTML = '* 8자 이상 20자 이하, 대소문자 및 특수문자를 1개씩 포함해야 합니다.';
    }
    
    if (isValidPassword) {
        passwordHelperText.innerHTML = "";
    }
}

// 유저 데이터 서버 전송
const submitUserData = async (event) => {
    event.preventDefault();
    const COMMON_URL = 'http://localhost:8080';

    const userFormData = {
        'email' : emailInput.value,
        'password' : passwordInput.value
    }

    const option = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userFormData)
    }

    const res = await fetch(`${COMMON_URL}/users/login`, {
        ...option
    });

    if (res.status == 200) {
        alert('로그인 성공!');
        setTimeout(() => {
            location.replace('/boards');
        }, 1000);
    } else {
        alert('존재하지 않는 유저입니다!');
    }
}

// 로그인 버튼 활성화
const activeLoginButton = () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    let isValidEmail = validateEmailPattern(email);
    let isValidPassword = validatePasswordPattern(password);

    // 유효성 검사 통과한 경우
    if (isValidEmail && isValidPassword) {
        loginButton.disabled = false;
        loginButton.style.cursor = "pointer";
        loginButton.style.backgroundColor = " #7F6AEE";
    } else {
        loginButton.disabled = true;
        loginButton.style.cursor = "default";
        loginButton.style.backgroundColor = "#ACA0EB";
    }
}

// 버튼 활성화
emailInput.addEventListener("keyup", () => {
    validateEmail();
    activeLoginButton();
});
passwordInput.addEventListener("keyup", () => {
    validatePassword();
    activeLoginButton();
});

loginButton.addEventListener('click', submitUserData);