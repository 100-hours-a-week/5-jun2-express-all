const dataURL = '../resource/data/boards-data.json';
const boardURL = '../resource/data/board-data.json';

const replyTextArea = document.getElementById('reply');
const replySubmitButton = document.getElementById('reply-submit-btn');
const replyUpdateButton = document.getElementById('reply-update-btn');
const commentDeleteButton = document.getElementById('reply-delete-btn');

const boardDeleteButton = document.getElementById('board-delete-btn');

const COMMON_URL = 'http://localhost:8080';

const getPathVariable = () => {
    const path = window.location.pathname;
    const boardIds = path.split('/');
    return boardIds[2];
}

const findBoardData = (boards, pathVariable) => {
    return boards.find(board => board.board_id == pathVariable);
}

const formatNumber = (inputNumber) => {
    if (inputNumber >= 1000) {
        inputNumber = (inputNumber / 1000).toFixed(1) + 'k';
    }
    return inputNumber;
}

const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear(); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2); 
    const hours = ('0' + date.getHours()).slice(-2); 
    const minutes = ('0' + date.getMinutes()).slice(-2); 
    const seconds = ('0' + date.getSeconds()).slice(-2); 

    return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
}

// 게시글 정보
const generateInfoBox = (element) => {
    let createdAt = formatDate(element.created_at);

    return `
        <div id="post-title">
            <h2>${element.title}</h2>
        </div>
        <div id="post-info-view">
            <div id="post-info">
                <div class="writer-info">
                    <img class="profile-img" src=${element.writer_profile_url}>
                    <span id="writer">${element.writer_name}</span>
                </div>
                <span class="time">${createdAt}</span>
            </div>
            <div class="btns">
                <button type="button" onclick='location.href="/boards/${element.board_id}/edit"'>수정</button>
                <button type="button" onclick='location.href="#delete-board-modal"'">삭제</button>
            </div>
        </div>
    `;
}

// 게시글 컨텐츠
const generateContentView = (element) => {
    let contentImgURL = element.image_url;
    let content = element.content;
    let viewsCount = formatNumber(element.views_count);
    let commentsCount = formatNumber(element.comments_count);


    return `
        <div id="content-img">
            <img src=${contentImgURL}>
        </div>
        <div id="content-text">
            <textarea name="" id="" cols="30" rows="10" readonly>${content}</textarea>
        </div>
        <div id="content-info-box">
            <div class="content-info">
                <p>${viewsCount}</p>
                <p>조회수</p>
            </div>
            <div class="content-info">
                <p>${commentsCount}</p>
                <p>댓글</p>
            </div>
        </div>
    `;
}

// 댓글 
const generateReplyForm = (data) => {
    let commentId = data.comment_id;
    let writerProfileURL = data.comment_writer_profile;
    let writerName = data.comment_writer_name;
    let comment = data.comment_content;
    let createdAt = formatDate(data.created_at);

    return `
        <div id="reply-${commentId}" class="reply-form">
            <div class="reply-info">
                <div class="reply-header">
                    <div class="writer-info">
                        <img class="profile-img" src=${writerProfileURL}>
                        <span class="reply-writer">${writerName}</span>
                    </div>
                    <span class="time">${createdAt}</span>
                </div>
                <div class="reply-content">
                    <span>${comment}</span>
                </div>
            </div>
            <div class="btns">
                <button type="button" onclick='updateReply(this)' class="reply-modify-btn">수정</button>
                <button type="button" onclick='location.href="#delete-reply-modal"'"><a>삭제</a></button>
            </div>
        </div>
    `;
}

const generateReplies = (comments) => {
    let html = '';
    comments.forEach(comment => {
        html += generateReplyForm(comment);
    });
    return html;
}

// 게시글 내용 가져와서 생성
const generateBoardContents = async () => {
    const boardId = getPathVariable();
    try {
        const option = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        
        const response = await fetch(`${COMMON_URL}/boards/${boardId}`, {
            ...option
        });
        const json = await response.json();
        const board = json.data;

        let infoBox = generateInfoBox(board);
        let contentView = generateContentView(board);
        let replies = generateReplies(board.comments);

        document.getElementById('post-info-box').innerHTML = infoBox;
        document.getElementById('content-view').innerHTML = contentView;
        document.getElementById('reply-list').innerHTML = replies;

    } catch (error) {
        console.error('template error!', error);
        throw error;
    }
}

generateBoardContents();

const activeSubmitButton = () => {
    const isEmpty = (replyTextArea.value.length == 0);
    if (isEmpty) {
        replySubmitButton.disabled = true;
        replySubmitButton.style.backgroundColor = "#ACA0EB";
        replySubmitButton.style.cursor = "default";
    } else {
        replySubmitButton.disabled = false;
        replySubmitButton.style.backgroundColor = "#7F6AEE";
        replySubmitButton.style.cursor = "pointer";
    }
}


replyTextArea.addEventListener('keyup', activeSubmitButton);

const findContentArea = (id) => {
    const children = document.getElementById('reply-list').querySelectorAll('.reply-form');

    for (let i = 0; i < children.length; i++) {
        // 현재 자식 요소가 해당 요소와 같으면 인덱스를 저장하고 반복 종료
        if (children[i].id === id) {
            return children[i];
        }
    }
}

// 나중에 수정해야함
const updateReply = (element) => {
    const replyFormElement = element.parentNode.parentNode;
    const replyContentElement = findContentArea(replyFormElement.id); 
    console.log(replyContentElement);

    const replyContentArea = replyContentElement.querySelector('.reply-info .reply-content span');
    const content = replyContentArea.textContent;
    replyTextArea.value = content;
    replySubmitButton.textContent = '댓글 수정';

    replySubmitButton.addEventListener('click', () => {
        replySubmitButton.textContent = '댓글 작성';
        const updateContent = replyTextArea.value;
        replyContentArea.textContent = updateContent;
        replyTextArea.textContent = "";
    })
}

// 게시글 삭제
const deleteBoard = async (event) => {
    event.preventDefault();
    const boardId = getPathVariable();

    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const res = await fetch(`${COMMON_URL}/boards/${boardId}`, {
        ...option
    });

    const json = await res.json();
    if (res.status == 200 || res.status == 201) {
        setTimeout(() => {
            location.replace('/boards');
        }, 1000);
    } else {
        alert(json.message);
    }
}

/*
* 댓글 관련 로직
*/
// 댓글 등록
const submitReply = async (event) => {
    event.preventDefault();
    const boardId = getPathVariable();

    const replyData = {
        'comment': replyTextArea.value
    }

    const option = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(replyData)
    }

    const res = await fetch(`${COMMON_URL}/boards/${boardId}/comments`, {
        ...option
    });

    const json = await res.json();
    if (res.status == 200 || res.status == 201) {
        location.reload();
    } else {
        alert(json.message);
    }
}

boardDeleteButton.addEventListener('click', deleteBoard);
replySubmitButton.addEventListener('click', submitReply);

