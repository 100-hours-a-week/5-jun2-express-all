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

const showFileName = () => {
    let file = imageInput.files[0].name;
    if (file != null) {
        fileText.innerText = `선택된 파일 : ${file}`;
    }
}

const findBoardData = (boards, pathVariable) => {
    return boards.find(board => board.board_id == pathVariable);
}

const generateBoardModify = async () => {
    const COMMON_URL = 'http://localhost:8080';
    const boardId = getPathVariable();
    try {
        const option = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await fetch(`${COMMON_URL}/boards/${boardId}`, {
            ...option
        });
        const json = await res.json();
        const boards = json.data;

        titleInput.value = boards.title;
        contentInput.innerText = boards.content;

    } catch (error) {
        throw error;
    }
}

const submitBoardData = async (event) => {
    event.preventDefault();
    const COMMON_URL = 'http://localhost:8080';
    const boardId = getPathVariable();

    // JSON 전송
    // const boardFormData = {
    //     'title': titleInput.value,
    //     'content': contentInput.value,
    //     'image_url': dummyImageURL,
    // }

    // const option = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     },
    //     body: JSON.stringify(boardFormData)
    // }

    // FormData 전송
    const formData = new FormData();
    formData.append('title', titleInput.value);
    formData.append('content', contentInput.value);
    formData.append('image', imageInput.files[0]);

    const option = {
        method: 'POST',
        cache: 'no-cache',
        body: formData
    }

    const res = await fetch(`${COMMON_URL}/boards/${boardId}`, {
        ...option
    });

    const json = await res.json();
    if (res.status == 200 || res.status == 201) {
        setTimeout(() => {
            location.replace(`/boards/${boardId}`);
        }, 1000);
    } else {
        alert(json.message);
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

generateBoardModify();
imageInputButton.addEventListener('click', imageInput.click());
imageInput.addEventListener('change', showFileName);

submitButton.addEventListener('click', submitBoardData);