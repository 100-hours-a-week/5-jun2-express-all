const titleInput = document.getElementById('board-title');
const contentInput = document.getElementById('content');
const helperText = document.querySelector('#helper-text span');
const submitButton = document.getElementById('submit-btn');

// 이미지 업로드 관련
const imageInputButton = document.getElementById('img-input-btn');
const imageInput = document.getElementById('img-input');
const fileText = document.getElementById('file-text');

const boardURL = '/resource/data/board-data.json';

const getPathVariable = () => {
    const path = window.location.pathname;
    const boardIds = path.split('/');
    return boardIds[2];
}

function showFileName() {
    let file = imageInput.files[0].name;
    if (file != null) {
        fileText.innerText = `선택된 파일 : ${file}`;
    }
}

const findBoardData = (boards, pathVariable) => {
    return boards.find(board => board.board_id == pathVariable);
}

const generateBoardModify = async () => {
    try {
        const response = await fetch(boardURL);
        const json = await response.json();
        const boards = json.boards;

        const pathVariable = getPathVariable();
        const data = findBoardData(boards, pathVariable);

        console.log(data);

        titleInput.value = data.title;
        contentInput.innerText = data.content;

    } catch (error) {
        throw error;
    }
}
const activeSubmitButton = () => {
    let title = titleInput.value;
    let content = contentInput.value;

    if (title.length == 0) {
        helperText.innerText = '* 제목을 입력해주세요.';
    }
    if (content.length == 0) {
        helperText.innerText = '* 내용을 입력해주세요.';
    }
    if (title.length == 0 && content.length == 0) {
        helperText.innerText = '* 제목, 내용을 모두 입력해주세요.';
    }

    if (title != '' && content != '') {
        helperText.innerText = "";
        
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#7F6AEE';
        submitButton.style.cursor = 'pointer';
    } else if (title == '' || content == '') {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#ACA0EB';
        submitButton.style.cursor = 'default';
    }
}

titleInput.addEventListener('input', activeSubmitButton);
contentInput.addEventListener('input', activeSubmitButton);
submitButton.addEventListener('click', () => {
    const id = getPathVariable();
    const URL = `/boards/${id}`;
    window.location.href = URL;
});

generateBoardModify();
imageInputButton.addEventListener('click', imageInput.click());
imageInput.addEventListener('change', showFileName);