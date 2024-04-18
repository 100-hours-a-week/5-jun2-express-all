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
