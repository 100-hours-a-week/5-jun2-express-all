const COMMON_URL = 'http://localhost:8080';

/*
* 비동기 코드를 작성하는 방법
* 1) async/await : await는 비동기 작업이 완료될 때까지 결과를 기다림
* 2) then : 'Promise' 체이닝을 통해 비동기 작업을 순차적으로 처리
*/
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

const generateBoard = (element) => {
    let likesCount = formatNumber(element.likes_count);
    let commentsCount = formatNumber(element.comments_count);
    let viewsCount = formatNumber(element.views_count);
    let createdAt = formatDate(element.created_at);
    let profileName = element.writer_profile_url.split('/')[1];
    let profileURL = `${COMMON_URL}/profiles/${profileName}`;
    console.log(`name: ${profileName} , url: ${profileURL}`);

    return `
    <a href="/boards/${element.board_id}" class="link">
        <div class="post-box" id=${element.board_id}>
            <div class="post-info">
                <div class="post-title">
                    <h2>${element.title}</h2>
                </div>
                <div class="info-details">
                    <div class="countings">
                        <span>좋아요 ${likesCount}</span>
                        <span>댓글 ${commentsCount}</span>
                        <span>조회수 ${viewsCount}</span>
                    </div>
                    <div class="time">
                        <span>${createdAt}</span>
                    </div>
                </div>
            </div>
            <hr class="line">
            <div class="user-info">
                <img class="profile-img" src=${profileURL}>
                <span>${element.writer_name}</span>
            </div>
        </div>
    </a>
    `;
}

// 더미 데이터 불러오는 로직
const generateBoardFromData = async () => {
    try {
        const response = await fetch(dataURL);
        const json = await response.json();
        const boards = json.boards;

        console.log(boards);

        let html = '';
        boards.forEach(board => {
            html += generateBoard(board);
        })

        return html;
    } catch (error) {
        console.error('template error!', error);
        throw error;
    }
}

// 서버에서 데이터 불러오는 로직
const generateBoardFromServer = async () => {
    try {
        console.log("=== 데이터 받기 시작 ===");

        const option = {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch(`${COMMON_URL}/boards`, {
            ...option
        });
        const json = await response.json();
        const boards = json.data;

        console.log(boards);

        let html = '';
        boards.forEach(board => {
            html += generateBoard(board);
        })

        return html;
    } catch (error) {
        console.error(`template error: ${error}`);
        throw error;
    }
}

const displayHTML = async () => {
    try {
        const html = await generateBoardFromServer();
        document.getElementById('content-box').innerHTML = html;
    } catch (error) {
        console.error(`Data fetching error: ${error}`);
    }
}

displayHTML();

// 로그아웃
const logoutButton = document.getElementById('logout-btn');

const requestLogout = async (event) => {
    event.preventDefault();
    const option = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const res = await fetch(`${COMMON_URL}/users/logout`, {
        ...option
    });

    const json = await res.json();

    if (res.status == 200 || res.status == 201) {
        alert('로그아웃 성공!');
        setTimeout(() => {
            location.replace('/login');
        }, 1000); 
    } else {
        alert(json.message);
    }
}

logoutButton.addEventListener('click', requestLogout);
