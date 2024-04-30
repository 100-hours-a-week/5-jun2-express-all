// 제목 및 내용
const titleInput = document.getElementById('board-title');
const contentInput = document.getElementById('content');
const contentHelper = document.getElementById('content-helper');

// 이미지 업로드 관련
const imageInputButton = document.getElementById('img-input-btn');
const imageInput = document.getElementById('img-input');
const fileText = document.getElementById('file-text');

const submitButton = document.getElementById('submit-btn');

const COMMON_URL = 'http://localhost:8080';

const showFileName = () => {
    let file = imageInput.files[0].name;
    if (file != null) {
        fileText.innerText = `선택된 파일 : ${file}`;
    }
}

// 게시글 데이터 서버 전송
const submitBoardData = async (event) => {
    event.preventDefault();
    
    // FormData 전송
    const formData = new FormData();
    formData.append('title', titleInput.value);
    formData.append('content', contentInput.value);
    formData.append('image', imageInput.files[0]);

    const option = {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        body: formData
    }

    const res = await fetch(`${COMMON_URL}/boards`, {
        ...option
    });

    const json = await res.json();
    console.log(json);

    if (res.status == 200 || res.status == 201) {
        setTimeout(() => {
            location.replace('/boards');
        }, 1000);
    } else {
        alert(json.message);
    }
}

const activeSubmitButton = () => {
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
