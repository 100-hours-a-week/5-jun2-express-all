/*
* TO-DO
* 1. 프로필 사진 업로드
* 2. 이메일 중복
* 3. 닉네임 중복
*/

const userDataURL = "../resource/data/user-data.json";

// Input
const profileInput = document.getElementById('image-upload');
const profileInputCircle = document.getElementById('circle');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pw');
const passwordCheckInput = document.getElementById('pw-check');
const nicknameInput = document.getElementById('nickname');
const signupButton = document.getElementById('signup-btn');

// Helper Text
const profileHelperText = document.getElementById('profile-helper');
const emailHelperText = document.getElementById('email-helper');
const passwordHelperText = document.getElementById('pw-helper');
const passwordCheckHelperText = document.getElementById('pw-check-helper');
const nicknameHelperText = document.getElementById('nickname-helper');

// 정규식
const EMAIL_PATTERN = /^[A-Za-z_\.\-]+@[A-Za-z\-]+\.[A-za-z\-]+/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}/;
const NICKNAME_PATTERN = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

// 안내 메시지 출력 함수
const writeHelperMessage = (helperText, message) => {
    helperText.innerText = message;
}

// 1) 프로필 사진
function setProfile(event) {
    let fileReader = new FileReader();
    let image = document.getElementById("profile-img");
    let crossLine = document.getElementById("cross-line");
    let file;

    try {
        file = event.target.files[0];
        fileReader.readAsDataURL(file);
        console.log(`name: ${file.name}`);  // 업로드된 파일 이름

        fileReader.onload = (event) => {
            console.log(`path: ${event.target.result}`);  // 업로드된 파일 경로
            image.setAttribute("src", event.target.result); // 파일 경로 지정
    
            // 만약 파일이 업로드됐다면 십자선 제거
            if (event.target != null) {
                crossLine.style.display = "none";
                profileHelperText.innerText = "";
            }
        }
    } catch (exception) {
        //console.log(`exception: ${exception}`);
        // 파일 업로드를 취소하면 이미지 삭제
        image.removeAttribute("src");

        // 파일 업로드를 취소하면 십자선 삽입
        crossLine.removeAttribute("style");
        
        // 메시지 출력
        profileHelperText.innerText = "* 프로필 메시지를 추가해주세요.";
    }
}

// 2) 이메일 유효성 검사
async function validateEmailDuplicated(email) {
    const response = await fetch(userDataURL);
    const users = await response.json();
    const result = users.some(user => user.email === email);

    //console.log(`result:${result}`);

    return result;
}

async function validateEmailPattern() {
    const email = emailInput.value;
    let message = "";

    let isEmpty = (email.length == 0);
    let isNull = (email == null);
    let isValidPattern = EMAIL_PATTERN.test(email);
    let isDuplicated = await validateEmailDuplicated(email);

    console.log(`empty:${isEmpty}, null:${isNull}, valid:${isValidPattern}, duplicated:${isDuplicated}`);

     // 유효하지 않은 형식인 경우
    if (!isValidPattern || isNull) {
        message = "* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)";
    } else if (isDuplicated) {
        message = "* 중복된 이메일입니다.";
    }
    if (isValidPattern && !isDuplicated) {
        message = "";
    }
    writeHelperMessage(emailHelperText, message);
}

function validateEmail() {
    const email = emailInput.value;
    let message = "";

    let isEmpty = (email == ' ');
    let isWriting = (email.length != 0);
    let isValidPattern = EMAIL_PATTERN.test(email);

    // 비어 있거나 작성중인 경우
    if (isEmpty || isWriting) {
        message = "* 이메일을 입력해주세요.";
    }

    if (isValidPattern) {
        message = "";
    }
    
    writeHelperMessage(emailHelperText, message);
}

// 3) 비밀번호 유효성 검사
function validatePassword() {
    const password = passwordInput.value;
    let message = "";

    let isEmpty = (password == '');
    let isValidPattern = PASSWORD_PATTERN.test(password);

    if (isEmpty) {
        message = "* 비밀번호를 입력해주세요.";
    } else if (!isValidPattern) {
        message = "* 비밀번호는 8~20자이며, 대소문자 및 특수문자를 포함해야 합니다.";
    }
    if (isValidPattern) {
        message = "";
    }

    writeHelperMessage(passwordHelperText, message);
}

// 4) 비밀번호 확인 유효성 검사
function validatePasswordCheck() {
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;
    let message = "";

    let isEmpty = (passwordCheck == '');
    let isSame = (passwordCheck === password);

    if (isEmpty) {
        message = "* 비밀번호를 한번 더 입력해주세요.";
    } else if (!isSame) {
        message = "* 비밀번호가 다릅니다.";
    }
    
    writeHelperMessage(passwordCheckHelperText, message);
}

// 5) 닉네임 유효성 검사
async function validateNicknameDuplicated(nickname) {
    const response = await fetch(userDataURL);
    const users = await response.json();
    const result = users.some(user => user.nickname === nickname);
    return result;
}

async function validateNickname() {
    const nickname = nicknameInput.value;
    let message = "";

    let isEmpty = (nickname == '');
    let isDuplicated;   // TO-BE 중복 검사
    let isContainSpace = (nickname.includes(' '));
    let isOverLength = (nickname.length > 10);
    let isValid = NICKNAME_PATTERN.test(nickname);
    let isDupliated = await validateNicknameDuplicated(nickname);

    if (isEmpty) {
        message = "* 닉네임을 입력해주세요.";
    } else if (isContainSpace) {
        message = "* 띄어쓰기를 없애주세요.";
    } else if (isDuplicated) {
        message = "* 중복된 닉네임입니다.";
    } else if (isOverLength) {
        message = "* 닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if (!isValid) {
        message = "* 올바르지 않은 닉네임 형식입니다.";
    } else if (isDupliated) {
        message = "* 중복된 닉네임입니다.";
    }

    writeHelperMessage(nicknameHelperText, message);
}

// 유저 데이터 서버 전송
const submitUserData = async (event) => {
    event.preventDefault();
    const COMMON_URL = 'http://localhost:8080';
    
    // 더미 프로필 사진
    const dummyProfileURL = 'http://profiles.com/profile/profile.jpg';

    const userFormData = {
        'profileUrl' : dummyProfileURL,
        'email' : emailInput.value,
        'password' : passwordInput.value,
        'nickname' : nicknameInput.value
    }

    const option = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userFormData)
    }

    const res = await fetch(`${COMMON_URL}/users/signup`, {
        ...option
    });

    //location.replace('/login');
}


// 회원가입 버튼 활성화 조건
async function validate(infoType, info) {
    if (infoType == "profile") {
        let image = document.getElementById("profile-img");
        const hasSrcAttribute = image.getAttribute('src') != null;
        return hasSrcAttribute;
    }
    if (infoType == "email") {
        const isDuplicated = await validateEmailDuplicated(info);
        //console.log(`이메일: ${EMAIL_PATTERN.test(info) && !isDuplicated}`);
        return EMAIL_PATTERN.test(info) && !isDuplicated;
    }
    if (infoType == "password") {
        return PASSWORD_PATTERN.test(info);
    }
    if (infoType == "passwordCheck") {
        const password = passwordInput.value;
        return (password === info) && (PASSWORD_PATTERN.test(info));
    }
    if (infoType == "nickname") {
        const isDuplicated = await validateNicknameDuplicated(info);
        //console.log(`닉네임 : ${NICKNAME_PATTERN.test(info) && !isDuplicated}`);
        return NICKNAME_PATTERN.test(info) && !isDuplicated;
    }
} 

const validateUserInfo = async (userInfo) => {
    const keys = Object.keys(userInfo);
    for (let i = 0; i < 5; i++) {
        //console.log(`key:${keys[i]}, value:${userInfo[keys[i]]}`);
        let result = await validate(keys[i], userInfo[keys[i]]);
        if (result == false) {
            console.log(`key:${keys[i]}, value:${userInfo[keys[i]]}`);
            return false;
        } else {
            continue;
        }
    }
    return true;
}

// 회원가입 버튼 활성화
async function activeSignupButton() {
    const userInfo = {
        "profile" : profileInput.value,
        "email" : emailInput.value,
        "password" : passwordInput.value,
        "passwordCheck" : passwordCheckInput.value,
        "nickname" : nicknameInput.value
    }

    let isValidUserInfo = await validateUserInfo(userInfo);

    if (isValidUserInfo) {
        signupButton.disabled = false;
        signupButton.style.cursor = "pointer";
        signupButton.style.backgroundColor = " #7F6AEE";
    } else {
        signupButton.disabled = true;
        signupButton.style.cursor = "default";
        signupButton.style.backgroundColor = "#ACA0EB";
    }
}

// 이벤트 리스너
profileInputCircle.addEventListener('click', () => profileInput.click());
emailInput.addEventListener('keyup', () => {
    validateEmail(),
    activeSignupButton()
});
emailInput.addEventListener('focusout', validateEmailPattern);
passwordInput.addEventListener('focusout', validatePassword);
passwordCheckInput.addEventListener('focusout',  validatePasswordCheck);
nicknameInput.addEventListener('focusout', validateNickname);

profileInputCircle.addEventListener('change', activeSignupButton);
emailInput.addEventListener('keyup', activeSignupButton);
passwordInput.addEventListener('keyup', activeSignupButton);
passwordCheckInput.addEventListener('keyup', activeSignupButton);
nicknameInput.addEventListener('keyup', activeSignupButton);

signupButton.addEventListener('click', submitUserData);