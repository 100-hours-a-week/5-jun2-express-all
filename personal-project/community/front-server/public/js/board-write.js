// 제목 및 내용
const titleInput = document.getElementById('board-title');
const contentInput = document.getElementById('content');
const contentHelper = document.getElementById('content-helper');

// 이미지 업로드 관련
const imageInputButton = document.getElementById('img-input-btn');
const imageInput = document.getElementById('img-input');
const fileText = document.getElementById('file-text');

const submitButton = document.getElementById('submit-btn');

function showFileName() {
    let file = imageInput.files[0].name;
    if (file != null) {
        fileText.innerText = `선택된 파일 : ${file}`;
    }
}

// 생성 날짜
const getCreatedDate = () => {
    const createdAt = new Date();

    const year = createdAt.getFullYear();
    const month = ('0' + (createdAt.getMonth() + 1)).slice(-2);
    const day = ('0' + createdAt.getDate()).slice(-2);

    const dateString = year + '-' + month  + '-' + day;

    const hours = ('0' + createdAt.getHours()).slice(-2); 
    const minutes = ('0' + createdAt.getMinutes()).slice(-2);
    const seconds = ('0' + createdAt.getSeconds()).slice(-2); 

    const timeString = hours + ':' + minutes  + ':' + seconds;

    return dateString + ' ' + timeString;
}

// 게시글 데이터 서버 전송
const submitBoardData = async (event) => {
    event.preventDefault();
    const COMMON_URL = 'http://localhost:8080';
    
    // 더미 프로필 사진
    const dummyImageURL = 'https://i.namu.wiki/i/w11dbZZeomJI4bD3_KItw3vq7tgglcM1YQA_xHULxMsixPpY1S7KcB8WrEFhJNuSuejiiQkicGKMH12JvpUqBQ.webp';
    const createdDate = getCreatedDate();
    const updatedDate = getCreatedDate();

    const boardFormData = {
        'title': titleInput.value,
        'content': contentInput.value,
        'image_url': dummyImageURL,
        'created_at': createdDate,
        'updated_at': updatedDate
    }

    const option = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(boardFormData)
    }

    const res = await fetch(`${COMMON_URL}/boards`, {
        ...option
    });

    setTimeout(() => {
        location.replace('/boards');
    }, 2000);
}

function activeSubmitButton() {
    let isTitleEmpty = (titleInput.value.length == 0);
    let isContentEmpty = (contentInput.value.length == 0);

    if (isTitleEmpty || isContentEmpty) {
        contentHelper.innerText = "* 제목, 내용을 모두 작성해주세요.";
    }
    if (!isTitleEmpty && !isContentEmpty) {
        submitButton.disabled = false;
        submitButton.style.cursor = 'pointer';
        submitButton.style.backgroundColor = '#7F6AEE';
        contentHelper.innerText = "";
    } else {
        submitButton.disabled = true;
        submitButton.style.cursor = 'default';
        submitButton.style.backgroundColor = '#ACA0EB';
    }
}

titleInput.addEventListener('keyup', activeSubmitButton);
contentInput.addEventListener('keyup', activeSubmitButton);

imageInputButton.addEventListener('click', imageInput.click());
imageInput.addEventListener('change', showFileName);

submitButton.addEventListener('click', submitBoardData);
