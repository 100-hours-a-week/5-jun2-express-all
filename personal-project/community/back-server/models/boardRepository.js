const boards = [
    {
        "board_id": 1,
        "title": "아 제목 뭐로 할지 정말 고민이다ㅋㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋ",
        "likes_count": 21,
        "comments_count": 33,
        "views_count": 99,
        "created_at": "2024-04-15T12:24:34",
        "writer_name": "일론 머스크",
        "writer_profile_url": "../resource/image/musk.jpeg"
    },
    {
        "board_id": 2,
        "title": "얘들아 나 사실 갤럭시 씀 ㅋㅋ",
        "likes_count": 14004,
        "comments_count": 2452,
        "views_count": 330235,
        "created_at": "2024-04-10T09:08:12",
        "writer_name": "스티브 잡스",
        "writer_profile_url": "../resource/image/steve.jpeg"
    },
    {
        "board_id": 3,
        "title": "깻잎으로 딱밤 때리기",
        "likes_count": 12,
        "comments_count": 7,
        "views_count": 49,
        "created_at": "2024-02-15T11:35:31",
        "writer_name": "무지",
        "writer_profile_url": "../resource/image/profile2.jpeg"
    },
    {
        "board_id": 4,
        "title": "혼자 가위바위보 해서 이기는 방법 (진지하게 연구함)",
        "likes_count": 532,
        "comments_count": 105,
        "views_count": 788,
        "created_at": "2024-01-01T00:13:57",
        "writer_name": "마윈",
        "writer_profile_url": "../resource/image/mawin.jpeg"
    },
    {
        "board_id": 5,
        "title": "이번에 맥 살건데 추천좀",
        "likes_count": 1302,
        "comments_count": 2125,
        "views_count": 40105,
        "created_at": "2024-01-01T20:22:56",
        "writer_name": "째용이형",
        "writer_profile_url": "../resource/image/jaeyong.jpeg"
    }
];

// 더미 데이터가 5개 이므로 5부터 시작
let id = 5;

// 게시글 등록
exports.save = async (req) => {
    try {
        const boardId = ++id;
        const board = {
            'board_id': boardId,
            'title': req.title,
            'content': req.content,
            'image_url': req.image_url,
            'created_at': '2024-22-01T12:33:06',
            'updated_at': '2024-22-01T12:33:06',
        }
        boards.push(board);
        return board;
    } catch (error) {
        throw error;
    }
}

// 게시글 목록 조회

// 게시글 상세 조회

// 게시글 수정

// 게시글 삭제